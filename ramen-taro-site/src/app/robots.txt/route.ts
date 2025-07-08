export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# サイトマップ
Sitemap: https://ramen-taro.com/sitemap.xml

# クロール間隔
Crawl-delay: 1

# 特定パスの制限
Disallow: /api/
Disallow: /studio/
Disallow: /_next/
Disallow: /admin/
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}