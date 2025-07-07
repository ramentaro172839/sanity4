import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../../lib/sanity";
import { formatShortDate, getValidDate } from "../../utils/dateFormatter";

// スラッグを正規化する関数
function normalizeSlug(slug: string): string {
  if (!slug) return 'untitled';
  
  // URLが含まれている場合の処理を強化
  if (slug.includes('://')) {
    try {
      const url = new URL(slug);
      const pathname = url.pathname;
      
      // /blog/ プレフィックスを除去
      if (pathname.startsWith('/blog/')) {
        return pathname.replace('/blog/', '');
      }
      
      // 最後のパス部分を抽出
      const parts = pathname.split('/').filter(Boolean);
      return parts[parts.length - 1] || 'untitled';
    } catch (error) {
      console.error('Invalid URL in slug:', slug);
      // URLの解析に失敗した場合、最後の部分を抽出
      const parts = slug.split('/');
      return parts[parts.length - 1] || 'untitled';
    }
  }
  
  // 通常のパス形式の場合
  if (slug.startsWith('/blog/')) {
    return slug.replace('/blog/', '');
  }
  
  // スラッシュが含まれている場合、最後の部分を抽出
  if (slug.includes('/')) {
    const parts = slug.split('/').filter(Boolean);
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
    *[_type == "post" && isPublished == true && defined(slug.current)] | order(publishedAt desc) {
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
    return await client.fetch(query, {}, { 
      next: { 
        revalidate: 60, // 60秒でキャッシュ更新
        tags: ['posts'] 
      } 
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Layout>
      <div className="relative min-h-screen bg-white">
        {/* ヘッダーセクション */}
        <div className="relative z-10 py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                  <span className="text-4xl animate-pulse">📚</span>
                </div>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6">
                Blog Articles
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mb-8"></div>
              <p className="text-2xl md:text-3xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
                らーめん太郎の日々の創作活動や思考を綴ったブログです
              </p>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post._id}
                  className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-300/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* アイキャッチ画像 */}
                  <div className="h-56 relative overflow-hidden">
                    {post.featuredImage?.asset?.url ? (
                      <Image
                        src={post.featuredImage.asset.url}
                        alt={post.featuredImage.alt || post.title}
                        width={400}
                        height={224}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mb-3 mx-auto animate-float">
                            <span className="text-2xl">📝</span>
                          </div>
                          <span className="text-gray-600 text-sm font-medium">Article</span>
                        </div>
                      </div>
                    )}
                    
                    {/* 公開日バッジ */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 text-sm font-medium border border-gray-200">
                      {formatShortDate(getValidDate(post.publishedAt, post._createdAt, post._updatedAt))}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* カテゴリー */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map((category) => (
                          <Link
                            key={category.slug.current}
                            href={`/blog/category/${category.slug.current}`}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-xs font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-300"
                          >
                            {category.title}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* 公開日 */}
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                      <time dateTime={post.publishedAt}>
                        {formatShortDate(getValidDate(post.publishedAt, post._createdAt, post._updatedAt))}
                      </time>
                    </div>

                    {/* タイトル */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 leading-tight">
                      {post.slug?.current ? (
                        <Link href={`/blog/${normalizeSlug(post.slug.current)}`}>
                          {post.title}
                        </Link>
                      ) : (
                        <span>{post.title}</span>
                      )}
                    </h2>

                    {/* 抜粋 */}
                    <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed text-lg">
                      {post.excerpt}
                    </p>

                    {/* 続きを読むリンク */}
                    {post.slug?.current ? (
                      <Link
                        href={`/blog/${normalizeSlug(post.slug.current)}`}
                        className="group/link inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 text-lg"
                      >
                        続きを読む
                        <svg className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <span className="text-gray-500 font-medium text-lg">
                        記事準備中
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* 記事が見つからない場合 */
            <div className="text-center py-20">
              <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                  <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  まだ記事がありません
                </h3>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  現在ブログ記事を準備中です。もうしばらくお待ちください。
                </p>
                <Link
                  href="/"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10">ホームに戻る</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}