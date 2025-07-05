import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ/サイトタイトル */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              らーめん太郎
            </h1>
          </Link>

          {/* ナビゲーションメニュー */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              ホーム
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              ブログ
            </Link>
            <Link 
              href="/profile" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              プロフィール
            </Link>
            <Link 
              href="/studio" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Studio
            </Link>
          </nav>

          {/* 検索アイコン */}
          <div className="flex items-center">
            <button 
              type="button"
              className="p-2 text-gray-700 hover:text-gray-900"
              aria-label="検索"
            >
              <svg 
                className="w-5 h-5" 
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
            </button>
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button 
              type="button"
              className="p-2 text-gray-700 hover:text-gray-900"
              aria-label="メニュー"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}