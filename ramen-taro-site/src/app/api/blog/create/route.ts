import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../../../lib/sanity';

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, categoryId, tagIds, featuredImageUrl } = await request.json();

    // 必須フィールドのチェック
    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { error: 'タイトル、本文、抜粋は必須です' },
        { status: 400 }
      );
    }

    // スラッグの生成（簡単な実装）
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // ブログ記事データの作成
    const postData: any = {
      _type: 'post',
      title,
      slug: {
        _type: 'slug',
        current: `${slug}-${Date.now()}`
      },
      excerpt,
      content: [
        {
          _type: 'block',
          _key: 'content1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: content
            }
          ]
        }
      ],
      publishedAt: new Date().toISOString(),
      isPublished: true
    };

    // カテゴリーの追加
    if (categoryId) {
      postData.categories = [
        {
          _type: 'reference',
          _ref: categoryId
        }
      ];
    }

    // タグの追加
    if (tagIds && tagIds.length > 0) {
      postData.tags = tagIds.map((tagId: string) => ({
        _type: 'reference',
        _ref: tagId
      }));
    }

    // アイキャッチ画像の追加
    if (featuredImageUrl) {
      // 実際の実装では、画像をSanityにアップロードする必要があります
      // ここでは簡単な実装として外部URLを使用
      postData.featuredImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-external'
        },
        alt: title
      };
    }

    // Sanityに記事を作成
    const result = await client.create(postData);

    return NextResponse.json({
      success: true,
      message: 'ブログ記事が正常に作成されました',
      postId: result._id,
      slug: result.slug.current
    });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'ブログ記事の作成に失敗しました' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'ブログ記事作成API',
    usage: 'POST /api/blog/create',
    fields: {
      title: 'string (required)',
      content: 'string (required)',
      excerpt: 'string (required)',
      categoryId: 'string (optional)',
      tagIds: 'string[] (optional)',
      featuredImageUrl: 'string (optional)'
    }
  });
}