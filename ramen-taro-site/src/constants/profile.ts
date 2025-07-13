// プロフィール情報の一元管理
// このファイルを編集することで、ホームページとプロフィールページの両方に自動反映されます

export interface FunFact {
  icon: string;
  text: string;
}

export interface ProfileInfo {
  creativeJourney: {
    title: string;
    descriptions: string[];
  };
  funFacts: {
    title: string;
    items: FunFact[];
  };
  about: {
    description: string;
  };
}

export const PROFILE_INFO: ProfileInfo = {
  creativeJourney: {
    title: "Creative Journey",
    descriptions: [
      "らーめん太郎は、HamCupDAOのコミュニティを中心に活動しています。",
      "コミュニティでは、楽しくイラストを描いたり、音声配信をしたりと、日々創作活動を行っています。"
    ]
  },
  funFacts: {
    title: "Fun Facts",
    items: [
      {
        icon: "🍞",
        text: "名前は「らーめん太郎」ですが、実はパンが大好物"
      },
      {
        icon: "🎨",
        text: "このサイトでは、これまでに描いてきたたくさんの作品をご紹介"
      }
    ]
  },
  about: {
    description: "らーめん太郎は、HamCupDAOのコミュニティを中心に活動しています。\n\nコミュニティでは、楽しくイラストを描いたり、音声配信をしたりと、日々創作活動を行っています。"
  }
};

// ホームページ用のサブタイトル
export const HOME_SUBTITLE = "HamCupDAOコミュニティを中心に活動するクリエイター。\nデジタルアートとイラストレーションで新しい世界を創造します。";

// 各種メタデータ
export const PROFILE_META = {
  name: "らーめん太郎",
  title: "Creative Designer & Digital Artist",
  description: "HamCupDAOコミュニティを中心に活動するクリエイティブデザイナー「らーめん太郎」の公式サイト。デジタルアート、イラスト制作、音声配信などの創作活動を発信しています。"
};