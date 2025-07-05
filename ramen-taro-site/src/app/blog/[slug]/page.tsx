import { notFound } from 'next/navigation';
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import { client } from "../../../../lib/sanity";
import { PortableText } from 'next-sanity';

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any[];
  featuredImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  publishedAt: string;
  categories?: Array<{
    title: string;
    slug: {
      current: string;
    };
    color: string;
  }>;
  tags?: Array<{
    title: string;
    slug: {
      current: string;
    };
  }>;
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `
    *[_type == "post" && slug.current == $slug && isPublished == true][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage {
        asset-> {
          url
        },
        alt
      },
      publishedAt,
      categories[]-> {
        title,
        slug,
        color
      },
      tags[]-> {
        title,
        slug
      }
    }
  `;
  
  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

async function getRelatedPosts(postId: string, categories: string[]): Promise<Post[]> {
  if (categories.length === 0) return [];
  
  const query = `
    *[_type == "post" && _id != $postId && isPublished == true && count(categories[]->_id) > 0 && references(*[_type == "category" && _id in $categories]._id)] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          url
        },
        alt
      },
      publishedAt
    }
  `;
  
  try {
    return await client.fetch(query, { 
      postId, 
      categories 
    });
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }

  const categoryIds = post.categories?.map(cat => cat.slug.current) || [];
  const relatedPosts = await getRelatedPosts(post._id, categoryIds);

  return (
    <Layout>
      <article className="bg-white">
        {/* アイキャッチ画像 */}
        {post.featuredImage?.asset?.url && (
          <div className="w-full h-64 md:h-96 relative">
            <Image
              src={post.featuredImage.asset.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* 記事ヘッダー */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            {/* カテゴリー */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex justify-center flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <Link
                    key={category.slug.current}
                    href={`/blog/category/${category.slug.current}`}
                    className={`px-3 py-1 text-sm font-medium rounded-full bg-${category.color}-100 text-${category.color}-800 hover:bg-${category.color}-200`}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}

            {/* タイトル */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* 公開日 */}
            <div className="text-gray-600 mb-4">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* 抜粋 */}
            <p className="text-xl text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* 記事本文 */}
          <div className="prose prose-lg max-w-none">
            <PortableText 
              value={post.content}
              components={{
                types: {
                  image: ({ value }) => {
                    const imageUrl = value?.asset?.url || value?.asset?._ref;
                    if (!imageUrl) return null;
                    
                    return (
                      <div className="my-8">
                        <Image
                          src={imageUrl}
                          alt={value?.alt || ''}
                          width={800}
                          height={400}
                          className="rounded-lg"
                        />
                        {value?.caption && (
                          <p className="text-sm text-gray-600 text-center mt-2">
                            {value.caption}
                          </p>
                        )}
                      </div>
                    );
                  },
                },
                block: {
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                      {children}
                    </h3>
                  ),
                  normal: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                },
              }}
            />
          </div>

          {/* タグ */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug.current}
                    href={`/blog/tag/${tag.slug.current}`}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                  >
                    #{tag.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* シェアボタン */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">シェア</h3>
            <div className="flex space-x-4">
              <ShareButton title={post.title} />
            </div>
          </div>
        </div>

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                関連記事
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost._id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    {relatedPost.featuredImage?.asset?.url && (
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={relatedPost.featuredImage.asset.url}
                          alt={relatedPost.featuredImage.alt || relatedPost.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">
                        <time dateTime={relatedPost.publishedAt}>
                          {new Date(relatedPost.publishedAt).toLocaleDateString('ja-JP')}
                        </time>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        <Link
                          href={`/blog/${relatedPost.slug.current}`}
                          className="hover:text-blue-600"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ナビゲーション */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← ブログ一覧に戻る
          </Link>
        </div>
      </article>
    </Layout>
  );
}