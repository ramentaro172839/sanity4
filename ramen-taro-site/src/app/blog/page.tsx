import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../../lib/sanity";

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
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
}

async function getPosts(): Promise<Post[]> {
  const query = `
    *[_type == "post" && isPublished == true] | order(publishedAt desc) {
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
      publishedAt,
      categories[]-> {
        title,
        slug,
        color
      }
    }
  `;
  
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Layout>
      <div className="bg-white">
        {/* ヘッダーセクション */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                ブログ
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                らーめん太郎の日々の創作活動や思考を綴ったブログです
              </p>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* アイキャッチ画像 */}
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    {post.featuredImage?.asset?.url ? (
                      <Image
                        src={post.featuredImage.asset.url}
                        alt={post.featuredImage.alt || post.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* カテゴリー */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category) => (
                          <Link
                            key={category.slug.current}
                            href={`/blog/category/${category.slug.current}`}
                            className={`px-2 py-1 text-xs font-medium rounded-full bg-${category.color}-100 text-${category.color}-800 hover:bg-${category.color}-200`}
                          >
                            {category.title}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* 公開日 */}
                    <div className="text-sm text-gray-500 mb-2">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* タイトル */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {/* 抜粋 */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* 続きを読むリンク */}
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      続きを読む →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* 記事が見つからない場合 */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  まだ記事がありません
                </h3>
                <p className="text-gray-600 mb-6">
                  現在ブログ記事を準備中です。もうしばらくお待ちください。
                </p>
                <Link
                  href="/"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  ホームに戻る
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}