'use client';

import React, { useState } from 'react';
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
  ]
};

type Year = 2023 | 2024 | 2025;

export default function WorksClient() {
  const [selectedYear, setSelectedYear] = useState<Year>(2025);

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
                  <div className="glass-dark rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25">
                    <div className="h-64 relative overflow-hidden">
                      <Image
                        src={artwork.image}
                        alt={`${selectedYear}年の作品 #${artwork.id}`}
                        width={400}
                        height={256}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
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
                        {selectedYear === 2023 && (
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
    </>
  );
}