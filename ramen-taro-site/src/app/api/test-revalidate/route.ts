import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // 開発環境でのみアクセス可能
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ message: 'Not available in production' }, { status: 404 });
    }

    // 全ページを強制的に再検証（テスト用）
    revalidatePath('/');
    revalidatePath('/blog');
    revalidateTag('posts');
    revalidateTag('categories');
    revalidateTag('tags');

    return NextResponse.json({ 
      message: 'Test revalidation completed',
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths: ['/', '/blog', 'tags: posts, categories, tags']
    });
    
  } catch (error) {
    console.error('Test revalidation error:', error);
    return NextResponse.json({ 
      message: 'Error during test revalidation', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 開発環境でのみアクセス可能
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ message: 'Not available in production' }, { status: 404 });
    }

    const body = await request.json();
    const { slug } = body;

    // 特定のスラッグをテスト
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath('/blog');
      revalidatePath('/');
      revalidateTag('posts');
      revalidateTag(`post-${slug}`);

      return NextResponse.json({ 
        message: `Test revalidation completed for slug: ${slug}`,
        revalidated: true,
        timestamp: new Date().toISOString(),
        paths: [`/blog/${slug}`, '/blog', '/']
      });
    }

    return NextResponse.json({ message: 'Please provide a slug in the request body' }, { status: 400 });
    
  } catch (error) {
    console.error('Test revalidation error:', error);
    return NextResponse.json({ 
      message: 'Error during test revalidation', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}