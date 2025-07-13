import React from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import { client } from "../../lib/sanity";
import { formatDate, formatShortDate, getValidDate } from "../utils/dateFormatter";
import StructuredData from "@/components/StructuredData";
import HomeClient from "@/components/HomeClient";
import { PROFILE_INFO, HOME_SUBTITLE } from "@/constants/profile";

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
    } catch {
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
  _createdAt: string;
  _updatedAt: string;
  isPublished?: boolean;
}


async function getLatestPostsData(): Promise<Post[]> {
  const query = `
    *[_type == "post" && (!defined(isPublished) || isPublished == true) && defined(slug.current)] | order(publishedAt desc)[0...3] {
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
      _createdAt,
      _updatedAt,
      isPublished
    }
  `;
  
  try {
    const result = await client.fetch(query, {}, { 
      cache: 'no-store' // 完全にキャッシュを無効化
    });
    console.log('Homepage posts fetched:', result?.length || 0, 'posts');
    console.log('Posts data:', result?.map((p: Post) => ({ title: p.title, isPublished: p.isPublished })));
    return result;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  // サーバーサイドでデータ取得
  const latestPosts = await getLatestPostsData();
  return (
    <Layout>
      <StructuredData type="website" />
      {/* ヒーローセクション - プロクリエイター仕様 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* 背景アニメーション */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* プロフィールアバター */}
          <div className="mb-12 relative">
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/ramen-taro-character.jpg"
                    alt="らーめん太郎キャラクター"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
          </div>

          {/* メインタイトル */}
          <div className="space-y-6 mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight animate-gradient">
              らーめん太郎
            </h1>
            <div className="relative">
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light tracking-wide">
                Creative Designer & Digital Artist
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
            </div>
          </div>

          {/* サブタイトル */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            {HOME_SUBTITLE.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < HOME_SUBTITLE.split('\n').length - 1 && <br className="hidden md:block" />}
              </React.Fragment>
            ))}
          </p>

          {/* CTA ボタン */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/blog"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 hover:rotate-1"
            >
              <span className="relative z-10">作品を見る</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            </Link>
            <Link
              href="/profile"
              className="group px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-2xl hover:bg-purple-400 hover:text-slate-900 transition-all duration-300 transform hover:scale-105 hover:-rotate-1"
            >
              プロフィール
            </Link>
          </div>

          {/* スクロール指示 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 自己紹介セクション - プロ仕様 */}
      <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 relative overflow-hidden">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-gradient">
              About Me
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左側：プロフィール画像 */}
            <div className="text-center lg:text-left">
              <div className="relative w-96 h-96 mx-auto lg:mx-0 mb-8">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-3xl overflow-hidden">
                    <Image
                      src="/ramen-taro-character.jpg"
                      alt="らーめん太郎キャラクター"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
              </div>
            </div>
            
            {/* 右側：説明文 */}
            <div className="space-y-8">
              <div className="glass-dark rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-4 h-4 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
                  {PROFILE_INFO.creativeJourney.title}
                </h3>
                {PROFILE_INFO.creativeJourney.descriptions.map((description, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed mb-4">
                    {description}
                  </p>
                ))}
              </div>
              
              <div className="glass-dark rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-4 h-4 bg-purple-400 rounded-full mr-3 animate-pulse"></span>
                  {PROFILE_INFO.funFacts.title}
                </h3>
                <div className="space-y-3 text-gray-300">
                  {PROFILE_INFO.funFacts.items.map((fact, index) => (
                    <div key={index} className="flex items-center">
                      <span className={`mr-3 text-xl ${index === 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {fact.icon}
                      </span>
                      <span>{fact.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 作品ギャラリーセクション - クライアントコンポーネント */}
      <HomeClient />

      {/* 最新ブログ記事セクション - プロ仕様 */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden">
        {/* 背景グリッド */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-gradient">
              Latest Articles
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              最新のブログ記事をチェックしてください
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <article key={post._id} className="group relative">
                  <div className="glass-dark rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25">
                    <div className="h-48 relative overflow-hidden">
                      {post.featuredImage?.asset?.url ? (
                        <Image
                          src={post.featuredImage.asset.url}
                          alt={post.featuredImage.alt || post.title}
                          width={400}
                          height={192}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-glow">
                              <span className="text-3xl">📝</span>
                            </div>
                            <span className="text-gray-300 text-lg font-medium">Article</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* 日付バッジ */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        {formatShortDate(getValidDate(post.publishedAt, post._createdAt, post._updatedAt))}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-col text-sm text-purple-300 mb-3 space-y-1">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-xs text-gray-400 mr-2">作成:</span>
                          <time dateTime={getValidDate(post.publishedAt, post._createdAt, post._updatedAt)}>
                            {formatDate(getValidDate(post.publishedAt, post._createdAt, post._updatedAt))}
                          </time>
                        </div>
                        {post._updatedAt && post._updatedAt !== post._createdAt && (
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-xs text-gray-400 mr-2">更新:</span>
                            <time dateTime={post._updatedAt}>
                              {formatDate(post._updatedAt)}
                            </time>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                        <Link href={`/blog/${normalizeSlug(post.slug.current)}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt || '記事の抜粋文がここに表示されます。'}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <Link
                          href={`/blog/${normalizeSlug(post.slug.current)}`}
                          className="group/link inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                        >
                          続きを読む
                          <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        
                        <div className="flex space-x-2">
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                            Blog
                          </span>
                          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                            Article
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              /* 記事が見つからない場合のフォールバック */
              <div className="col-span-full text-center py-20">
                <div className="max-w-md mx-auto glass-dark rounded-2xl p-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                    <span className="text-4xl">📝</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    記事を準備中です
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    現在ブログ記事を準備中です。もうしばらくお待ちください。
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center mt-16">
            <Link
              href="/blog"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">すべての記事を見る</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
