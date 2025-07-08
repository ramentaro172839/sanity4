import { client } from "../../../lib/sanity";

interface Post {
  slug: {
    current: string;
  };
  publishedAt: string;
  _updatedAt: string;
}

async function getPosts(): Promise<Post[]> {
  const query = `
    *[_type == "post" && isPublished == true && defined(slug.current)] {
      slug,
      publishedAt,
      _updatedAt
    }
  `;
  
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    return [];
  }
}

export async function GET() {
  const posts = await getPosts();
  const baseUrl = 'https://ramen-taro.com';
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: post._updatedAt || post.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}