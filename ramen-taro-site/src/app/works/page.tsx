import Layout from "@/components/Layout";
import WorksClient from "@/components/WorksClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "作品ギャラリー",
  description: "らーめん太郎のイラスト作品を年別にご紹介。2023年から2025年までの創作活動の軌跡をお楽しみください。",
  openGraph: {
    title: "作品ギャラリー | らーめん太郎",
    description: "らーめん太郎のイラスト作品を年別にご紹介。2023年から2025年までの創作活動の軌跡をお楽しみください。",
    type: "website",
  },
};

export default function WorksPage() {

  return (
    <Layout>
      {/* ヒーローセクション */}
      <section className="relative min-h-[50vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-gradient">
            作品ギャラリー
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            らーめん太郎のイラスト作品を年別にご紹介
          </p>
        </div>
      </section>

      {/* Client Component for interactive features */}
      <WorksClient />
    </Layout>
  );
}