import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../../../lib/sanity';

// 自動投稿用のサンプルコンテンツ
const SAMPLE_POSTS = [
  {
    title: 'HamCupDAOコミュニティでの新作イラスト',
    excerpt: '今日はHamCupDAOコミュニティで新しいイラストを描きました。みんなとの創作活動はとても楽しいです！',
    content: 'HamCupDAOコミュニティでの創作活動について書いています。今回は新しいキャラクターのイラストに挑戦しました。コミュニティのメンバーからたくさんのフィードバックをもらえて、とても勉強になりました。',
    category: 'イラスト'
  },
  {
    title: '音声配信での創作談義',
    excerpt: '音声配信で創作について語りました。リスナーの皆さんとの交流がとても楽しかったです。',
    content: '今日の音声配信では、創作活動について深く語りました。イラストを描く時の心境や、インスピレーションの源について話しました。リスナーの皆さんからもたくさんの質問をいただき、とても有意義な時間でした。',
    category: '音声配信'
  },
  {
    title: 'パンの新作レシピに挑戦',
    excerpt: 'らーめん太郎ですが、今日はパン作りに挑戦しました！意外と上手くできて嬉しいです。',
    content: '名前はらーめん太郎ですが、実はパンが大好きです。今日は新しいレシピに挑戦して、美味しいパンを作ることができました。創作活動と料理は似ているところがあって、どちらも集中して取り組むのが楽しいです。',
    category: '日常'
  }
];

export async function POST(request: NextRequest) {
  try {
    // APIキーによる認証（簡単な実装）
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.AUTO_POST_API_KEY || 'your-secret-key';
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }

    // ランダムにサンプル投稿を選択
    const randomPost = SAMPLE_POSTS[Math.floor(Math.random() * SAMPLE_POSTS.length)];

    // カテゴリーを取得または作成
    let category = await client.fetch(
      `*[_type == "category" && title == $title][0]`,
      { title: randomPost.category }
    );

    if (!category) {
      // カテゴリーが存在しない場合は作成
      category = await client.create({
        _type: 'category',
        title: randomPost.category,
        slug: {
          _type: 'slug',
          current: randomPost.category.toLowerCase().replace(/\s+/g, '-')
        },
        description: `${randomPost.category}に関する記事`,
        color: 'blue'
      });
    }

    // スラッグの生成
    const slug = randomPost.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // ブログ記事データの作成
    const postData = {
      _type: 'post',
      title: randomPost.title,
      slug: {
        _type: 'slug',
        current: `${slug}-${Date.now()}`
      },
      excerpt: randomPost.excerpt,
      content: [
        {
          _type: 'block',
          _key: 'content1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: randomPost.content
            }
          ]
        }
      ],
      categories: [
        {
          _type: 'reference',
          _ref: category._id
        }
      ],
      publishedAt: new Date().toISOString(),
      isPublished: true
    };

    // Sanityに記事を作成
    const result = await client.create(postData);

    return NextResponse.json({
      success: true,
      message: '自動投稿が正常に完了しました',
      post: {
        id: result._id,
        title: result.title,
        slug: result.slug.current,
        category: randomPost.category
      }
    });

  } catch (error) {
    console.error('Error in auto-post:', error);
    return NextResponse.json(
      { error: '自動投稿に失敗しました' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'ブログ自動投稿API',
    usage: 'POST /api/blog/auto-post',
    auth: 'Bearer token required',
    description: 'ランダムなサンプル記事を自動投稿します'
  });
}