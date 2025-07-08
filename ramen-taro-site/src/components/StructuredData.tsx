'use client';

interface Person {
  "@type": "Person";
  name: string;
  url: string;
  sameAs: string[];
  jobTitle: string;
  description: string;
  image: string;
}


interface StructuredDataProps {
  type: 'website' | 'blogPosting';
  data?: {
    title?: string;
    description?: string;
    image?: string;
    publishedAt?: string;
    updatedAt?: string;
    url?: string;
    keywords?: string[];
    categories?: string[];
  };
}

const basePersonData: Person = {
  "@type": "Person",
  name: "らーめん太郎",
  url: "https://ramen-taro.com",
  sameAs: [
    "https://x.com/@ramen_taro86",
    "https://www.instagram.com/ramen_taro8686"
  ],
  jobTitle: "Creative Designer & Digital Artist",
  description: "HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー",
  image: "https://ramen-taro.com/ramen-taro-character.jpg"
};

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;

  if (type === 'website') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "らーめん太郎",
      url: "https://ramen-taro.com",
      description: "HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー「らーめん太郎」の公式サイト",
      author: basePersonData,
      inLanguage: "ja-JP"
    };
  } else if (type === 'blogPosting' && data) {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: data.title,
      description: data.description,
      image: data.image || "https://ramen-taro.com/ramen-taro-character.jpg",
      author: basePersonData,
      publisher: {
        "@type": "Person",
        name: "らーめん太郎"
      },
      datePublished: data.publishedAt,
      dateModified: data.updatedAt || data.publishedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.url || "https://ramen-taro.com"
      },
      keywords: data.keywords || [],
      articleSection: data.categories || []
    };
  }

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}