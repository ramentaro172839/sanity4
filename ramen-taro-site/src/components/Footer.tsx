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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                aria-label="X"
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
                href="https://discord.gg/kvhCb8dYz2" 
                className="group relative w-12 h-12 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-xl flex items-center justify-center text-indigo-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-500"
                aria-label="Discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
              <a 
                href="https://suno.com/@ramentaro86" 
                className="group relative w-12 h-12 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-xl flex items-center justify-center text-orange-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500"
                aria-label="SUNO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
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