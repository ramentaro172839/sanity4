import { NextRequest, NextResponse } from 'next/server';
import { bulkAutoTag } from '@/lib/tagSuggestions';

export async function POST(request: NextRequest) {
  try {
    // リクエストボディから設定を取得
    const body = await request.json();
    const { 
      force = false, // 既にタグ付けされた記事も再処理するか
      maxPosts = 50  // 一度に処理する最大記事数
    } = body;

    console.log('一括自動タグ付けを開始:', { force, maxPosts });
    
    // 一括自動タグ付けを実行
    const result = await bulkAutoTag();
    
    console.log('一括自動タグ付け完了:', result);
    
    // 結果を返す
    return NextResponse.json({
      success: true,
      result: {
        processed: result.success + result.failed,
        successful: result.success,
        failed: result.failed,
        successRate: result.success + result.failed > 0 
          ? Math.round((result.success / (result.success + result.failed)) * 100) 
          : 0
      },
      message: `${result.success}件の記事に自動タグを適用しました（失敗: ${result.failed}件）`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('一括自動タグ付けエラー:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: '一括自動タグ付け中にエラーが発生しました',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// GET: 一括タグ付けのステータス確認
export async function GET() {
  try {
    // Sanityから統計情報を取得
    const { client } = await import('../../../../lib/sanity');
    
    const stats = await client.fetch(`
      {
        "totalPosts": count(*[_type == "post"]),
        "taggedPosts": count(*[_type == "post" && count(tags) > 0]),
        "autoTaggedPosts": count(*[_type == "post" && autoTagged == true]),
        "untaggedPosts": count(*[_type == "post" && (!defined(tags) || count(tags) == 0)]),
        "totalTags": count(*[_type == "tag"])
      }
    `);
    
    return NextResponse.json({
      status: 'ready',
      service: 'Bulk Auto Tag API',
      statistics: stats,
      lastUpdate: new Date().toISOString(),
      endpoints: {
        POST: '/api/bulk-auto-tag - 一括自動タグ付けを実行',
        GET: '/api/bulk-auto-tag - ステータス確認'
      }
    });
    
  } catch (error) {
    console.error('統計情報取得エラー:', error);
    
    return NextResponse.json(
      { 
        status: 'error',
        error: '統計情報の取得に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}