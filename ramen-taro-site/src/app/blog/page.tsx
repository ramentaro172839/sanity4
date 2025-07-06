import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../../lib/sanity";

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
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* ヘッダーセクション */}
        <div className="relative z-10 py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                  <span className="text-4xl animate-pulse">📚</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-gradient">
                Blog Articles
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
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
                  className="group relative glass-dark rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25"
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
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mb-3 mx-auto animate-float">
                            <span className="text-2xl">📝</span>
                          </div>
                          <span className="text-gray-400 text-sm font-medium">Article</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* 公開日バッジ */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                        month: 'short',
                        day: 'numeric'
                      })}
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
                            className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full text-xs font-medium hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300"
                          >
                            {category.title}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* 公開日 */}
                    <div className="flex items-center text-sm text-purple-300 mb-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* タイトル */}
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                      {post.slug?.current ? (
                        <Link href={`/blog/${normalizeSlug(post.slug.current)}`}>
                          {post.title}
                        </Link>
                      ) : (
                        <span>{post.title}</span>
                      )}
                    </h2>

                    {/* 抜粋 */}
                    <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* 続きを読むリンク */}
                    {post.slug?.current ? (
                      <Link
                        href={`/blog/${normalizeSlug(post.slug.current)}`}
                        className="group/link inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
                      >
                        続きを読む
                        <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <span className="text-gray-500 font-medium">
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
              <div className="max-w-md mx-auto glass-dark rounded-2xl p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                  <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  まだ記事がありません
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  現在ブログ記事を準備中です。もうしばらくお待ちください。
                </p>
                <Link
                  href="/"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10">ホームに戻る</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}