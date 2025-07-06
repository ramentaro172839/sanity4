'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ロゴ/サイトタイトル */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl animate-pulse">🍜</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 group-hover:animate-gradient">
              らーめん太郎
            </h1>
          </Link>

          {/* ナビゲーションメニュー */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              href="/" 
              className="group relative px-6 py-3 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-xl hover:bg-white/10"
            >
              <span className="relative z-10">ホーム</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/blog" 
              className="group relative px-6 py-3 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-xl hover:bg-white/10"
            >
              <span className="relative z-10">ブログ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/profile" 
              className="group relative px-6 py-3 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-xl hover:bg-white/10"
            >
              <span className="relative z-10">プロフィール</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </nav>

          {/* 検索アイコン */}
          <div className="flex items-center space-x-4">
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

            {/* モバイルメニューボタン */}
            <button 
              type="button"
              className="md:hidden group relative p-3 text-white/80 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10"
              aria-label="メニュー"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                className={`w-6 h-6 group-hover:scale-110 transition-all duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
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

        {/* モバイルメニュー */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <nav className="py-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-3 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-xl hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link 
              href="/blog" 
              className="block px-4 py-3 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-xl hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              ブログ
            </Link>
            <Link 
              href="/profile" 
              className="block px-4 py-3 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-xl hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              プロフィール
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}