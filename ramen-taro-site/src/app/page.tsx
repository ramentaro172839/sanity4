'use client'

import React, { useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import { client } from "../../lib/sanity";
import { formatDate, formatShortDate, getValidDate } from "../utils/dateFormatter";
import StructuredData from "@/components/StructuredData";
import ImageModal from "@/components/ImageModal";

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
}


async function getLatestPostsData() {
  const query = `
    *[_type == "post" && isPublished == true && defined(slug.current)] | order(publishedAt desc)[0...3] {
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
      _updatedAt
    }
  `;
  
  try {
    return await client.fetch(query, {}, { 
      next: { 
        revalidate: 60,
        tags: ['posts'] 
      } 
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default function Home() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    imageSrc: '',
    imageAlt: '',
    title: ''
  });

  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  // データ取得
  React.useEffect(() => {
    getLatestPostsData().then(setLatestPosts);
  }, []);

  const openModal = (imageSrc: string, imageAlt: string, title: string) => {
    setModalState({
      isOpen: true,
      imageSrc,
      imageAlt,
      title
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      imageSrc: '',
      imageAlt: '',
      title: ''
    });
  };
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
            HamCupDAOコミュニティを中心に活動するクリエイター。
            <br className="hidden md:block" />
            デジタルアートとイラストレーションで新しい世界を創造します。
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
                  Creative Journey
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  らーめん太郎は、HamCupDAOのコミュニティを中心に活動するクリエイティブデザイナーです。
                </p>
                <p className="text-gray-300 leading-relaxed">
                  コミュニティでは、楽しくイラストを描いたり、音声配信をしたりと、
                  日々創作活動を行っています。
                </p>
              </div>
              
              <div className="glass-dark rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-4 h-4 bg-purple-400 rounded-full mr-3 animate-pulse"></span>
                  Fun Facts
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-3 text-xl">🍞</span>
                    <span>名前は「らーめん太郎」ですが、実はパンが大好物</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3 text-xl">🎨</span>
                    <span>このサイトでは、これまでに描いてきたたくさんの作品をご紹介</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 作品ギャラリーセクション - プロ仕様 */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* 背景パーティクル */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/6 left-1/5 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/6 right-1/5 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-gradient">
              Creative Gallery
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              僕がこれまでに描いてきた作品の数々を年代別にご覧いただけます。
            </p>
            <p className="text-lg text-purple-300 mt-4 font-semibold">
              「2023年〜2025年」
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 作品1 - ラジオネーム ゴリラ豪雨 */}
            <div className="group relative">
              <div className="glass-dark rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25">
                <div 
                  className="h-64 relative overflow-hidden cursor-pointer"
                  onClick={() => openModal('/artwork-1.png', 'ラジオネーム ゴリラ豪雨', 'ラジオネーム ゴリラ豪雨')}
                >
                  <Image
                    src="/artwork-1.png"
                    alt="ラジオネーム ゴリラ豪雨"
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* クリック可能であることを示すアイコン */}
                  <div className="absolute top-4 left-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  {/* ホバー時のオーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                    ラジオネーム ゴリラ豪雨
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    HamCup DAOファンアート作品。存在しないラジオネームごっこから生まれた作品。
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-300 font-medium">
                      2023年5月
                    </span>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">
                        Fan Art
                      </span>
                      <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                        HamCup
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 作品2 - ら太幼稚園 全員集合 */}
            <div className="group relative">
              <div className="glass-dark rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25">
                <div 
                  className="h-64 relative overflow-hidden cursor-pointer"
                  onClick={() => openModal('/artwork-2.jpg', 'ら太幼稚園 全員集合', 'ら太幼稚園 全員集合')}
                >
                  <Image
                    src="/artwork-2.jpg"
                    alt="ら太幼稚園 全員集合"
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* クリック可能であることを示すアイコン */}
                  <div className="absolute top-4 left-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  {/* ホバー時のオーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                    ら太幼稚園 全員集合
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    HamCup DAOで活動している方達を幼稚園シリーズとして誕生したファンアート作品。
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-300 font-medium">
                      2024年4月
                    </span>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">
                        Character Art
                      </span>
                      <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                        Collection
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 作品3 - HamCup擬人化全員集合 */}
            <div className="group relative">
              <div className="glass-dark rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25">
                <div 
                  className="h-64 relative overflow-hidden cursor-pointer"
                  onClick={() => openModal('/artwork-3.jpg', 'HamCup擬人化 全員集合', 'HamCup擬人化 全員集合')}
                >
                  <Image
                    src="/artwork-3.jpg"
                    alt="HamCup擬人化 全員集合"
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* クリック可能であることを示すアイコン */}
                  <div className="absolute top-4 left-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  {/* ホバー時のオーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                    HamCup擬人化 全員集合
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    HamCup DAOの様々なキャラクターたちを擬人化したファンアート作品。
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-300 font-medium">
                      2025年1月
                    </span>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">
                        Fan Art
                      </span>
                      <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                        HamCup
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* 画像モーダル */}
      <ImageModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        imageSrc={modalState.imageSrc}
        imageAlt={modalState.imageAlt}
        title={modalState.title}
      />
    </Layout>
  );
}
