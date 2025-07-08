import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ramen-taro.com'),
  title: {
    default: "らーめん太郎 | Creative Designer & Digital Artist",
    template: "%s | らーめん太郎"
  },
  description: "HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー「らーめん太郎」の公式サイト。デジタルアート、イラスト制作、音声配信などの創作活動を発信しています。",
  keywords: ["らーめん太郎", "デジタルアート", "イラスト", "クリエイター", "HamCupDAO", "音声配信", "ファンアート"],
  authors: [{ name: "らーめん太郎" }],
  creator: "らーめん太郎",
  publisher: "らーめん太郎",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://ramen-taro.com",
    siteName: "らーめん太郎",
    title: "らーめん太郎 | Creative Designer & Digital Artist",
    description: "HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー「らーめん太郎」の公式サイト。デジタルアート、イラスト制作、音声配信などの創作活動を発信しています。",
    images: [
      {
        url: "/ramen-taro-character.jpg",
        width: 1200,
        height: 630,
        alt: "らーめん太郎キャラクター",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ramen_taro86",
    creator: "@ramen_taro86",
    title: "らーめん太郎 | Creative Designer & Digital Artist",
    description: "HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー「らーめん太郎」の公式サイト。デジタルアート、イラスト制作、音声配信などの創作活動を発信しています。",
    images: ["/ramen-taro-character.jpg"],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
