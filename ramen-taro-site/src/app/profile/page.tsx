import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PROFILE_INFO } from "@/constants/profile";

export const metadata: Metadata = {
  title: "プロフィール",
  description: "HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー「らーめん太郎」のプロフィール。デジタルアート、イラスト制作の経歴や活動履歴をご紹介します。",
  openGraph: {
    title: "プロフィール | らーめん太郎",
    description: "HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー「らーめん太郎」のプロフィール。デジタルアート、イラスト制作の経歴や活動履歴をご紹介します。",
    type: "profile",
    images: [
      {
        url: "/images/ogp-image.jpg",
        width: 1200,
        height: 630,
        alt: "HamCupDAO全員集合 - らーめん太郎のプロフィール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "プロフィール | らーめん太郎",
    description: "HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー「らーめん太郎」のプロフィール。デジタルアート、イラスト制作の経歴や活動履歴をご紹介します。",
    images: ["/images/ogp-image.jpg"],
  },
};

export default function ProfilePage() {
  return (
    <Layout>
      {/* ヒーローセクション */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center overflow-hidden">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/2 right-1/6 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* プロフィール画像 */}
            <div className="text-center lg:text-left">
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto lg:mx-0 mb-6 sm:mb-8">
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

            {/* プロフィール情報 */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 animate-gradient">
                  らーめん太郎
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                  Creative Designer & Digital Artist
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-4"></div>
              </div>

              <div className="space-y-6 text-gray-300">
                <div className="glass-dark rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                    About Me
                  </h3>
                  <p className="leading-relaxed">
                    {PROFILE_INFO.about.description}
                  </p>
                </div>


                <div className="glass-dark rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <span className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></span>
                    {PROFILE_INFO.funFacts.title}
                  </h3>
                  <ul className="space-y-2">
                    {PROFILE_INFO.funFacts.items.map((fact, index) => (
                      <li key={index} className="flex items-center">
                        <span className={`mr-2 ${index === 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {fact.icon}
                        </span>
                        {fact.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <Link
                  href="/works"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 text-center min-w-[140px]"
                >
                  <span className="relative z-10">作品を見る</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 活動履歴セクション */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
              Creative Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              これまでの創作活動と作品の軌跡
            </p>
          </div>

          <div className="relative">
            {/* タイムライン */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>

            <div className="space-y-12">
              {/* 2025年 */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="glass-dark rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">2025年</h3>
                    <h4 className="text-lg text-cyan-400 mb-3">公式サイト＆ブログ開設</h4>
                    <p className="text-gray-300">
                      Next.jsとSanity CMSを使用した、<br />
                      らーめん太郎公式サイトを構築。<br />
                      より多くの人に作品を届けるプラットフォームが完成。
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* 2024年 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <div className="flex-1 pl-8">
                  <div className="glass-dark rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">2024年</h3>
                    <h4 className="text-lg text-purple-400 mb-3">コミュニティ活動本格化</h4>
                    <p className="text-gray-300">
                      HamCupDAOコミュニティでの創作活動が活発化。<br className="hidden sm:block" />
                      SunoAI音楽生成で音楽制作開始。
                    </p>
                  </div>
                </div>
              </div>

              {/* 2023年 */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="glass-dark rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">2023年</h3>
                    <h4 className="text-lg text-green-400 mb-3">デジタルアート開始</h4>
                    <p className="text-gray-300">
                      「らーめん太郎」としての活動をスタート。<br className="hidden sm:block" />
                      ファンアートを描いて絵の楽しさに目覚める。<br className="hidden sm:block" />
                      音声配信やファンアートイラスト作品の制作を開始。
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                <div className="flex-1 pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SNSリンクセクション */}
      <section className="relative py-20 bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-800 overflow-hidden">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-gradient">
              Let&apos;s Connect
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 font-light">
              SNSで最新の作品や活動をチェックしてください
            </p>
          </div>
          
          <div className="flex justify-center flex-wrap gap-4 sm:gap-6">
            {/* X (旧Twitter) */}
            <a
              href="https://x.com/@ramen_taro86"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 hover:from-cyan-400 hover:to-blue-500 border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-white/40 glass-dark text-cyan-400 hover:text-white"
            >
              <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                X
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/ramen_taro8686?igsh=d2F5Y2Ixd3BmYnBq&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-purple-400/20 to-pink-500/20 hover:from-purple-400 hover:to-pink-500 border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-white/40 glass-dark text-purple-400 hover:text-white"
              style={{ animationDelay: '0.1s' }}
            >
              <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                Instagram
              </div>
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg/kvhCb8dYz2"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 hover:from-indigo-400 hover:to-purple-500 border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-white/40 glass-dark text-indigo-400 hover:text-white"
              style={{ animationDelay: '0.2s' }}
            >
              <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
              </svg>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                Discord
              </div>
            </a>

            {/* SUNO */}
            <a
              href="https://suno.com/@ramentaro86"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-orange-400/20 to-red-500/20 hover:from-orange-400 hover:to-red-500 border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-white/40 glass-dark text-orange-400 hover:text-white"
              style={{ animationDelay: '0.3s' }}
            >
              <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                SUNO
              </div>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}