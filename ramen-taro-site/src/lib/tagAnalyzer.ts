// タグ解析ロジック

export interface TagAnalysisResult {
  suggestedTags: string[];
  confidence: number;
  existingTags: string[];
  newTags: string[];
}

export interface ContentToAnalyze {
  title: string;
  excerpt: string;
  content: string;
}

// 日本語のキーワード抽出パターン
const KEYWORD_PATTERNS = {
  // HamCup関連
  hamcup: /ハムカップ|HamCup|hamcup|DAO|NFT|コミュニティ|web3/gi,
  
  // アート関連
  art: /アート|イラスト|絵|描|作品|デザイン|クリエイト|創作/gi,
  
  // 技術関連
  tech: /技術|プログラミング|開発|エンジニア|コード|システム|アプリ|ウェブ|web|react|next\.js|typescript|javascript/gi,
  
  // ライフスタイル
  lifestyle: /日常|生活|趣味|体験|感想|レビュー|おすすめ|グルメ|旅行|音楽|映画/gi,
  
  // 学習・成長
  learning: /学習|勉強|成長|挑戦|初心者|練習|上達|スキル|知識|経験/gi,
  
  // ビジネス
  business: /ビジネス|仕事|副業|収益|マーケティング|ブランド|戦略/gi,
};

// 一般的なタグマッピング
const TAG_MAPPINGS: Record<string, string> = {
  'ハムカップ': 'HamCup',
  'DAO': 'DAO',
  'NFT': 'NFT',
  'コミュニティ': 'コミュニティ',
  'アート': 'アート',
  'イラスト': 'イラスト',
  '技術': 'テクノロジー',
  'プログラミング': 'プログラミング',
  '開発': '開発',
  '学習': '学習',
  '成長': '成長',
  '挑戦': 'チャレンジ',
  '初心者': '初心者向け',
  'React': 'React',
  'Next.js': 'Next.js',
  'TypeScript': 'TypeScript',
  '日常': 'ライフスタイル',
  '体験': '体験談',
  'レビュー': 'レビュー',
};

/**
 * テキストからキーワードを抽出
 */
function extractKeywords(text: string): string[] {
  const keywords: string[] = [];
  
  // 各パターンでマッチング
  Object.entries(KEYWORD_PATTERNS).forEach(([, pattern]) => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const normalized = TAG_MAPPINGS[match] || match;
        if (!keywords.includes(normalized)) {
          keywords.push(normalized);
        }
      });
    }
  });
  
  return keywords;
}

/**
 * 文章の長さと複雑さから信頼度を計算
 */
function calculateConfidence(content: ContentToAnalyze, suggestedTags: string[]): number {
  const titleScore = content.title.length > 10 ? 0.3 : 0.1;
  const excerptScore = content.excerpt.length > 50 ? 0.3 : 0.1;
  const contentScore = content.content.length > 200 ? 0.4 : 0.2;
  const tagScore = suggestedTags.length > 0 ? Math.min(suggestedTags.length * 0.1, 0.3) : 0;
  
  return Math.min(titleScore + excerptScore + contentScore + tagScore, 1.0);
}

/**
 * 既存タグとの照合
 */
function matchExistingTags(suggestedTags: string[], existingTagList: string[]): { existing: string[], new: string[] } {
  const existing: string[] = [];
  const newTags: string[] = [];
  
  suggestedTags.forEach(tag => {
    const match = existingTagList.find(existingTag => 
      existingTag.toLowerCase().includes(tag.toLowerCase()) ||
      tag.toLowerCase().includes(existingTag.toLowerCase())
    );
    
    if (match) {
      if (!existing.includes(match)) {
        existing.push(match);
      }
    } else {
      if (!newTags.includes(tag)) {
        newTags.push(tag);
      }
    }
  });
  
  return { existing, new: newTags };
}

/**
 * メインのタグ分析関数
 */
export function analyzeContentForTags(
  content: ContentToAnalyze, 
  existingTags: string[] = []
): TagAnalysisResult {
  // 全文を結合してキーワード抽出
  const fullText = `${content.title} ${content.excerpt} ${content.content}`;
  const suggestedTags = extractKeywords(fullText);
  
  // 既存タグとの照合
  const { existing, new: newTags } = matchExistingTags(suggestedTags, existingTags);
  
  // 信頼度計算
  const confidence = calculateConfidence(content, [...existing, ...newTags]);
  
  return {
    suggestedTags: [...existing, ...newTags].slice(0, 8), // 最大8個
    confidence,
    existingTags: existing,
    newTags
  };
}

/**
 * タグの重要度でソート
 */
export function sortTagsByRelevance(tags: string[], content: string): string[] {
  return tags.sort((a, b) => {
    const aCount = (content.match(new RegExp(a, 'gi')) || []).length;
    const bCount = (content.match(new RegExp(b, 'gi')) || []).length;
    return bCount - aCount;
  });
}