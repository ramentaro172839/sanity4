'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import ImageModal from '@/components/ImageModal';

export default function HomeClient() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    imageSrc: '',
    imageAlt: '',
    title: ''
  });

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
    <>
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

      {/* 画像モーダル */}
      <ImageModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        imageSrc={modalState.imageSrc}
        imageAlt={modalState.imageAlt}
        title={modalState.title}
      />
    </>
  );
}