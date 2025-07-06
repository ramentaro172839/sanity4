import { notFound } from 'next/navigation';
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import { client } from "../../../../lib/sanity";
import { PortableText } from 'next-sanity';

// スラッグを正規化する関数
function normalizeSlug(slug: string): string {
  // URLが含まれている場合、最後のパス部分を抽出
  if (slug.includes('://')) {
    const parts = slug.split('/');
    return parts[parts.length - 1] || 'untitled';
  }
  
  // スラッシュが含まれている場合、最後の部分を抽出
  if (slug.includes('/')) {
    const parts = slug.split('/');
    return parts[parts.length - 1] || 'untitled';
  }
  
  // 既に正規化されている場合はそのまま返す
  return slug;
}

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
  // まず正規化されたスラッグで検索
  let query = `
    *[_type == "post" && slug.current == $slug && isPublished == true && defined(slug.current)][0] {
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
    let post = await client.fetch(query, { slug });
    
    // 正規化されたスラッグで見つからない場合、元のスラッグから逆検索
    if (!post) {
      const alternativeQuery = `
        *[_type == "post" && slug.current match "*${slug}" && isPublished == true && defined(slug.current)][0] {
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
      post = await client.fetch(alternativeQuery);
    }
    
    return post;
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
      <article className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        {/* アイキャッチ画像 */}
        {post.featuredImage?.asset?.url && (
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <Image
              src={post.featuredImage.asset.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          </div>
        )}

        {/* 記事ヘッダー */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            {/* カテゴリー */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex justify-center flex-wrap gap-3 mb-8">
                {post.categories.map((category) => (
                  <Link
                    key={category.slug.current}
                    href={`/blog/category/${category.slug.current}`}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full text-sm font-medium hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 border border-cyan-500/30"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}

            {/* タイトル */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-8 animate-gradient leading-tight">
              {post.title}
            </h1>

            {/* 公開日 */}
            <div className="flex items-center justify-center text-lg text-purple-300 mb-6">
              <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* 抜粋 */}
            <div className="glass-dark rounded-2xl p-8 mb-12">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                {post.excerpt}
              </p>
            </div>
          </div>

          {/* 記事本文 */}
          <div className="glass-dark rounded-2xl p-8 md:p-12 mb-12">
            <div className="prose prose-lg prose-invert max-w-none">
              <PortableText 
                value={post.content}
                components={{
                  types: {
                    image: ({ value }) => {
                      const imageUrl = value?.asset?.url || value?.asset?._ref;
                      if (!imageUrl) return null;
                      
                      return (
                        <div className="my-12 relative group">
                          <div className="rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                            <Image
                              src={imageUrl}
                              alt={value?.alt || ''}
                              width={800}
                              height={400}
                              className="w-full h-auto"
                            />
                          </div>
                          {value?.caption && (
                            <p className="text-sm text-gray-400 text-center mt-4 italic">
                              {value.caption}
                            </p>
                          )}
                        </div>
                      );
                    },
                  },
                  block: {
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mt-16 mb-8 border-l-4 border-cyan-400 pl-6">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
                        <span className="w-3 h-3 bg-purple-400 rounded-full mr-4 animate-pulse"></span>
                        {children}
                      </h3>
                    ),
                    normal: ({ children }) => (
                      <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>
          </div>

          {/* タグ */}
          {post.tags && post.tags.length > 0 && (
            <div className="glass-dark rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-3 h-3 bg-pink-400 rounded-full mr-4 animate-pulse"></span>
                タグ
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug.current}
                    href={`/blog/tag/${tag.slug.current}`}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 rounded-full hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 border border-pink-500/30"
                  >
                    #{tag.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* シェアボタン */}
          <div className="glass-dark rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></span>
              シェア
            </h3>
            <div className="flex space-x-4">
              <ShareButton title={post.title} />
            </div>
          </div>
        </div>

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <div className="relative z-10 py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-gradient">
                  Related Articles
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <article
                    key={relatedPost._id}
                    className="group glass-dark rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {relatedPost.featuredImage?.asset?.url && (
                      <div className="h-48 relative overflow-hidden">
                        <Image
                          src={relatedPost.featuredImage.asset.url}
                          alt={relatedPost.featuredImage.alt || relatedPost.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-purple-300 mb-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                        <time dateTime={relatedPost.publishedAt}>
                          {new Date(relatedPost.publishedAt).toLocaleDateString('ja-JP')}
                        </time>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                        <Link href={`/blog/${normalizeSlug(relatedPost.slug.current)}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <Link
            href="/blog"
            className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-xl hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 border border-cyan-500/30"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ブログ一覧に戻る
          </Link>
        </div>
      </article>
    </Layout>
  );
}