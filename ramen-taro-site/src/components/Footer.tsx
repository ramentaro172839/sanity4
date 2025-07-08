import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 border-t border-white/10 overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* サイト情報 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mr-4 animate-float">
                <span className="text-3xl animate-pulse">🍜</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  らーめん太郎
                </h3>
                <p className="text-gray-400 text-sm font-medium">Creative Designer & Digital Artist</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              HamCupDAOコミュニティを中心に活動する「らーめん太郎」の公式サイトです。
              イラスト制作や音声配信など、日々の創作活動をお楽しみください。
            </p>
            <div className="flex space-x-4">
              <div className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                Digital Art
              </div>
              <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                Creative
              </div>
              <div className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">
                HamCupDAO
              </div>
            </div>
          </div>

          {/* クイックリンク */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
              サイトマップ
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="group text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/blog" className="group text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/profile" className="group text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  プロフィール
                </Link>
              </li>
            </ul>
          </div>

          {/* SNSリンク */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse"></span>
              SNS
            </h4>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/@ramen_taro86" 
                className="group relative w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center text-cyan-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/ramen_taro8686?igsh=d2F5Y2Ixd3BmYnBq&utm_source=qr" 
                className="group relative w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-xl flex items-center justify-center text-purple-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="group relative w-12 h-12 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-xl flex items-center justify-center text-red-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-red-400 hover:to-red-600"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 らーめん太郎. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Made with ❤️ in Japan
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                Powered by Next.js & Sanity
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}