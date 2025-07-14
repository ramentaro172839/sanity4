'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";

// 実際の作品データ
const artworks = {
  2025: [
    { id: "2025-01", image: "/artworks/2025/2025.png" },
    { id: "2025-02", image: "/artworks/2025/2025kabutosan1.png" },
    { id: "2025-03", image: "/artworks/2025/black_ma_20250403081926.png" },
    { id: "2025-04", image: "/artworks/2025/HamCup_001_20250114083532.png" },
    { id: "2025-05", image: "/artworks/2025/HamCup_001_jaga_entrance_ceremony_20250403075653.png" },
    { id: "2025-06", image: "/artworks/2025/HamCup_002_sakura_entrance_ceremony_20250403075847.png" },
    { id: "2025-07", image: "/artworks/2025/HamCup_003_at_20250114083416.png" },
    { id: "2025-08", image: "/artworks/2025/HamCup_003_entrance_ceremony_20250404213435.png" },
    { id: "2025-09", image: "/artworks/2025/HamCup_004_entrance_ceremony_20250405071319.png" },
    { id: "2025-10", image: "/artworks/2025/HamCup_005_at_20250114083327.png" },
    { id: "2025-11", image: "/artworks/2025/HamCup_005_entrance_ceremony_20250405072349.png" },
    { id: "2025-12", image: "/artworks/2025/HamCup_006_entrance_ceremony_20250405202414.png" },
    { id: "2025-13", image: "/artworks/2025/HamCup_007_20250513213243.png" },
    { id: "2025-14", image: "/artworks/2025/HamCup_007_entrance_ceremony_20250407081825.png" },
    { id: "2025-15", image: "/artworks/2025/HamCup_008_ice_slugger_20250628070101.jpg" },
    { id: "2025-16", image: "/artworks/2025/HamCup_008_red_white_cap_ultraman_20250628070051.jpg" },
    { id: "2025-17", image: "/artworks/2025/HamCup_009_at_20250114083219.png" },
    { id: "2025-18", image: "/artworks/2025/HamCup_010_at_20250114083207.png" },
    { id: "2025-19", image: "/artworks/2025/HamCup_011_at_20250114083155.png" },
    { id: "2025-20", image: "/artworks/2025/HamCup擬人化全員集合_20250628065929.jpg" },
    { id: "2025-21", image: "/artworks/2025/HamCup通信No.900号_20250624215413.png" },
    { id: "2025-22", image: "/artworks/2025/ござさん_20250629074611.jpg" },
    { id: "2025-23", image: "/artworks/2025/オズ&ほんてぃ 握手_20250621101920.png" },
    { id: "2025-24", image: "/artworks/2025/無題492_20250628065915.jpg" },
    { id: "2025-25", image: "/artworks/2025/無題508_20250628065952.jpg" },
    { id: "2025-26", image: "/artworks/2025/無題602_20250621090909.png" },
    { id: "2025-27", image: "/artworks/2025/無題603.2025.06.21-10.06_20250621102733.png" },
    { id: "2025-28", image: "/artworks/2025/無題603_20250621101541.png" },
  ],
  2024: [
    { id: "2024-01", image: "/artworks/2024/2024.1.PNG" },
    { id: "2024-02", image: "/artworks/2024/2024.2.PNG" },
    { id: "2024-03", image: "/artworks/2024/2024.3.PNG" },
    { id: "2024-04", image: "/artworks/2024/2024.4.PNG" },
    { id: "2024-05", image: "/artworks/2024/2024.5.PNG" },
    { id: "2024-06", image: "/artworks/2024/2024.6.PNG" },
    { id: "2024-07", image: "/artworks/2024/2024.8.PNG" },
    { id: "2024-08", image: "/artworks/2024/2024.10.PNG" },
    { id: "2024-09", image: "/artworks/2024/2024.11.PNG" },
    { id: "2024-10", image: "/artworks/2024/2024.13.PNG" },
    { id: "2024-11", image: "/artworks/2024/2024.15.PNG" },
    { id: "2024-12", image: "/artworks/2024/2024.16.PNG" },
    { id: "2024-13", image: "/artworks/2024/2024.17.PNG" },
    { id: "2024-14", image: "/artworks/2024/2024.18.PNG" },
    { id: "2024-15", image: "/artworks/2024/2024.19.PNG" },
    { id: "2024-16", image: "/artworks/2024/2024.20.JPG" },
  ],
  2023: [
    { id: "2023-01", image: "/artworks/2023/2023.1.PNG" },
    { id: "2023-02", image: "/artworks/2023/2023.2.jpg" },
    { id: "2023-03", image: "/artworks/2023/2023.3.PNG" },
    { id: "2023-04", image: "/artworks/2023/2023.4.PNG" },
    { id: "2023-05", image: "/artworks/2023/2023.5.PNG" },
    { id: "2023-06", image: "/artworks/2023/2023.6.PNG" },
    { id: "2023-07", image: "/artworks/2023/2023.7.PNG" },
    { id: "2023-08", image: "/artworks/2023/2023.8.PNG" },
    { id: "2023-09", image: "/artworks/2023/2023.9.PNG" },
    { id: "2023-10", image: "/artworks/2023/2023.10.PNG" },
    { id: "2023-11", image: "/artworks/2023/2023.11.PNG" },
    { id: "2023-12", image: "/artworks/2023/2023.12.PNG" },
    { id: "2023-13", image: "/artworks/2023/2023binntyoutan.PNG" },
    { id: "2023-14", image: "/artworks/2023/擬人化　元データ.2023.10.12-14.56_20250629215438.jpg" },
    { id: "2023-15", image: "/artworks/2023/無題292.2023.09.20-10.23_20250629215222.jpg" },
    { id: "2023-16", image: "/artworks/2023/無題308.2023.09.26-03.08_20250629215357.jpg" },
    { id: "2023-17", image: "/artworks/2023/かじゅさん_20250629215648.jpg" },
    { id: "2023-18", image: "/artworks/2023/とらぃねこさん　リーゼント_20250629215540.jpg" },
    { id: "2023-19", image: "/artworks/2023/擬人化　元データ_20250629215413.jpg" },
    { id: "2023-20", image: "/artworks/2023/無題131_20250629215043.jpg" },
    { id: "2023-21", image: "/artworks/2023/無題221_20250629215057.jpg" },
    { id: "2023-22", image: "/artworks/2023/無題225_20250629215119.jpg" },
    { id: "2023-23", image: "/artworks/2023/無題244_20250629215151.jpg" },
    { id: "2023-24", image: "/artworks/2023/無題248_20250629215558.jpg" },
    { id: "2023-25", image: "/artworks/2023/無題297_20250629215231.jpg" },
    { id: "2023-26", image: "/artworks/2023/無題298_20250629215239.jpg" },
    { id: "2023-27", image: "/artworks/2023/無題299_20250629215246.jpg" },
    { id: "2023-28", image: "/artworks/2023/無題300_20250629215253.jpg" },
    { id: "2023-29", image: "/artworks/2023/無題301_20250629215301.jpg" },
    { id: "2023-30", image: "/artworks/2023/無題302_20250629215309.jpg" },
    { id: "2023-31", image: "/artworks/2023/無題303_20250629215318.jpg" },
    { id: "2023-32", image: "/artworks/2023/無題304_20250629215325.jpg" },
    { id: "2023-33", image: "/artworks/2023/無題305_20250629215333.jpg" },
    { id: "2023-34", image: "/artworks/2023/無題306_20250629215342.jpg" },
    { id: "2023-35", image: "/artworks/2023/無題307_20250629215349.jpg" },
    { id: "2023-36", image: "/artworks/2023/無題310_20250629215403.jpg" },
    { id: "2023-37", image: "/artworks/2023/無題343_20250629215625.jpg" },
    { id: "2023-38", image: "/artworks/2023/無題46_20250629214940.jpg" },
    { id: "2023-39", image: "/artworks/2023/無題59_20250629215002.jpg" },
  ]
};

type Year = 2023 | 2024 | 2025;

export default function WorksClient() {
  const [selectedYear, setSelectedYear] = useState<Year>(2025);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // スクロール無効化
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // スクロール復元
    };
  }, [selectedImage]);

  return (
    <>
      {/* 年別フィルターセクション */}
      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 mb-12">
            {[2025, 2024, 2023].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year as Year)}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedYear === year
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {year}年
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 作品グリッドセクション */}
      <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-gradient">
              {selectedYear}年の作品
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto"></div>
          </div>

          {artworks[selectedYear].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks[selectedYear].map((artwork) => (
                <div key={artwork.id} className="group relative">
                  <div 
                    className="glass-dark rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25 cursor-pointer"
                    onClick={() => setSelectedImage(artwork.image)}
                  >
                    <div className="h-64 relative overflow-hidden">
                      <Image
                        src={artwork.image}
                        alt={`${selectedYear}年の作品 #${artwork.id}`}
                        width={400}
                        height={256}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 rounded-full p-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex space-x-2">
                          <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                            イラスト
                          </span>
                          <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                            {selectedYear}
                          </span>
                        </div>
                        {(selectedYear === 2023 || selectedYear === 2025) && (
                          <div className="text-xs text-gray-400 text-center break-all">
                            {artwork.image.split('/').pop()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* 作品がない場合のメッセージ */
            <div className="text-center py-20">
              <div className="max-w-md mx-auto glass-dark rounded-2xl p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                  <span className="text-4xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {selectedYear}年の作品
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  現在{selectedYear}年の作品を準備中です。もうしばらくお待ちください。
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 画像モーダル */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div 
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="フルサイズ表示"
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}