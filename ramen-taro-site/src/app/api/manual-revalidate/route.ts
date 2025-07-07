import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 簡易認証（開発環境用）
    const authKey = request.headers.get('x-auth-key') || request.nextUrl.searchParams.get('key');
    if (authKey !== process.env.AUTO_POST_API_KEY && authKey !== 'manual-update') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 全キャッシュを強制更新
    revalidatePath('/');
    revalidatePath('/blog');
    revalidateTag('posts');
    revalidateTag('categories');
    revalidateTag('tags');

    // 個別記事も更新
    const body = await request.json().catch(() => ({}));
    if (body.slug) {
      revalidatePath(`/blog/${body.slug}`);
      revalidateTag(`post-${body.slug}`);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Manual revalidation completed',
      timestamp: new Date().toISOString(),
      paths: ['/', '/blog', body.slug ? `/blog/${body.slug}` : null].filter(Boolean)
    });
    
  } catch (error) {
    console.error('Manual revalidation error:', error);
    return NextResponse.json({ 
      message: 'Error during manual revalidation', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // URLパラメータでの認証
    const authKey = request.nextUrl.searchParams.get('key');
    if (authKey !== 'manual-update') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 簡易更新
    revalidatePath('/');
    revalidatePath('/blog');
    revalidateTag('posts');

    return NextResponse.json({ 
      success: true,
      message: 'Manual cache refresh completed',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Manual refresh error:', error);
    return NextResponse.json({ 
      message: 'Error during manual refresh', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}