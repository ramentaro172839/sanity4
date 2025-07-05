import Layout from "@/components/Layout";
import Link from "next/link";

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* プロフィール画像 */}
            <div className="text-center lg:text-left">
              <div className="relative w-80 h-80 mx-auto lg:mx-0 mb-8">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1 animate-spin-slow">
                  <div className="w-full h-full bg-slate-900 rounded-3xl flex items-center justify-center">
                    <span className="text-9xl animate-pulse">🍜</span>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
              </div>
            </div>

            {/* プロフィール情報 */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 animate-gradient">
                  らーめん太郎
                </h1>
                <p className="text-2xl text-gray-300 font-light tracking-wide">
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
                    HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー。
                    デジタルアートとイラストレーションを通じて、新しい世界観の創造に取り組んでいます。
                  </p>
                </div>

                <div className="glass-dark rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['Digital Art', 'Illustration', 'UI/UX Design', 'Creative Direction', 'Community Building'].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full text-sm font-medium hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-dark rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <span className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></span>
                    Fun Facts
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">🍞</span>
                      名前は「らーめん太郎」ですが、実はパンが大好物
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">🎨</span>
                      コミュニティでの創作活動が日々のインスピレーション
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-400 mr-2">🎙️</span>
                      音声配信を通じて創作について語ることも
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/blog"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  <span className="relative z-10">作品を見る</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                </Link>
                <button className="px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-2xl hover:bg-purple-400 hover:text-slate-900 transition-all duration-300 transform hover:scale-105">
                  Contact
                </button>
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
                      Next.jsとSanity CMSを使用した公式サイトを構築。
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
                      HamCupDAOコミュニティでの創作活動が活発化。
                      音声配信やコラボレーション作品の制作を開始。
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
                      「らーめん太郎」としての活動をスタート。
                      イラストレーションとデジタルアートの世界に足を踏み入れる。
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
      <section className="py-16 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Let's Connect</h2>
          <div className="flex justify-center space-x-6">
            {[
              { name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-600' },
              { name: 'Instagram', icon: '📷', color: 'from-pink-400 to-purple-600' },
              { name: 'Discord', icon: '💬', color: 'from-indigo-400 to-purple-600' },
              { name: 'YouTube', icon: '📺', color: 'from-red-400 to-pink-600' }
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className={`group w-16 h-16 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center text-2xl hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-current/25`}
              >
                <span className="group-hover:animate-bounce">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}