'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 relative">
          {/* ロゴ/サイトタイトル */}
          <Link href="/" className="flex items-center group ml-4 sm:ml-0 md:-ml-4 lg:-ml-8 xl:-ml-12">
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 group-hover:animate-gradient">
              らーめん太郎
            </h1>
          </Link>

          {/* 右側：検索アイコンとハンバーガーメニュー */}
          <div className="absolute right-0 flex items-center space-x-4">
            <button 
              type="button"
              className="group relative p-3 text-white/80 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10"
              aria-label="検索"
            >
              <svg 
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* ハンバーガーメニューボタン（全デバイス対応） */}
            <button 
              type="button"
              className="group relative p-3 text-white/80 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10"
              aria-label="メニュー"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <svg 
                className={`w-6 h-6 group-hover:scale-110 transition-all duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* ハンバーガーメニュー（全デバイス対応） */}
        <div className={`transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 pb-0'} overflow-hidden`}>
          <nav className="pt-4 space-y-3 border-t border-white/20">
            <Link 
              href="/" 
              className="group relative flex items-center px-6 py-4 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-2xl hover:bg-white/10 mx-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-8 h-8 mr-4 flex items-center justify-center text-2xl">🏠</span>
              <span className="relative z-10 text-lg">ホーム</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/blog" 
              className="group relative flex items-center px-6 py-4 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-2xl hover:bg-white/10 mx-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-8 h-8 mr-4 flex items-center justify-center text-2xl">📝</span>
              <span className="relative z-10 text-lg">ブログ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/profile" 
              className="group relative flex items-center px-6 py-4 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-2xl hover:bg-white/10 mx-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-8 h-8 mr-4 flex items-center justify-center text-2xl">👤</span>
              <span className="relative z-10 text-lg">プロフィール</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}