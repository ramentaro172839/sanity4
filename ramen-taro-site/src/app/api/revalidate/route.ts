import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Sanityからのwebhookの検証（セキュリティ）
    const secret = request.nextUrl.searchParams.get('secret');
    if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // 更新されたドキュメントの情報を取得
    const { _type, slug } = body;

    if (_type === 'post') {
      // 特定の記事ページを再検証
      if (slug?.current) {
        revalidatePath(`/blog/${slug.current}`);
      }
      
      // ブログ一覧ページを再検証
      revalidatePath('/blog');
      
      // ホームページ（最新記事が表示される）を再検証
      revalidatePath('/');
      
      // 記事関連のタグを再検証
      revalidateTag('posts');
    }

    if (_type === 'category') {
      // カテゴリーページを再検証
      if (slug?.current) {
        revalidatePath(`/blog/category/${slug.current}`);
      }
      
      // 全てのブログページを再検証（カテゴリーが表示されるため）
      revalidatePath('/blog');
      revalidateTag('categories');
    }

    if (_type === 'tag') {
      // タグページを再検証
      if (slug?.current) {
        revalidatePath(`/blog/tag/${slug.current}`);
      }
      
      revalidateTag('tags');
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      paths: ['/blog', '/', slug?.current ? `/blog/${slug.current}` : null].filter(Boolean)
    });
    
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}