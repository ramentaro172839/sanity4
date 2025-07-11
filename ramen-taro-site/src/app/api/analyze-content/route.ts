import { NextRequest, NextResponse } from 'next/server';
import { suggestTagsForContent, createNewTags } from '@/lib/tagSuggestions';
import { ContentToAnalyze } from '@/lib/tagAnalyzer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // リクエストボディの検証
    const { title, excerpt, content, options = {} } = body;
    
    if (!title && !excerpt && !content) {
      return NextResponse.json(
        { error: '分析するコンテンツが提供されていません' },
        { status: 400 }
      );
    }
    
    // コンテンツオブジェクトの構築
    const contentToAnalyze: ContentToAnalyze = {
      title: title || '',
      excerpt: excerpt || '',
      content: content || ''
    };
    
    // タグ提案の実行
    const suggestions = await suggestTagsForContent(contentToAnalyze, {
      maxTags: options.maxTags || 6,
      minConfidence: options.minConfidence || 0.3,
      includeNewTags: options.includeNewTags !== false
    });
    
    // 新規タグの作成（オプション）
    let createdTags: { _id: string; title: string }[] = [];
    if (options.createNewTags && suggestions.newTags.length > 0) {
      try {
        createdTags = await createNewTags(suggestions.newTags);
      } catch (tagError) {
        console.error('新規タグの作成に失敗:', tagError);
        // エラーがあっても提案は返す
      }
    }
    
    // レスポンスの構築
    const response = {
      suggestions: {
        tags: suggestions.suggestedTags,
        confidence: suggestions.confidence,
        existingTags: suggestions.existingTags,
        newTags: suggestions.newTags,
        tagReferences: suggestions.tagReferences || []
      },
      createdTags,
      meta: {
        totalSuggested: suggestions.suggestedTags.length,
        existingCount: suggestions.existingTags.length,
        newCount: suggestions.newTags.length,
        confidence: suggestions.confidence,
        timestamp: new Date().toISOString()
      }
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('コンテンツ分析エラー:', error);
    
    return NextResponse.json(
      { 
        error: 'コンテンツの分析中にエラーが発生しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET: 分析機能のヘルスチェック
export async function GET() {
  try {
    return NextResponse.json({
      status: 'healthy',
      service: 'Content Analysis API',
      version: '1.0.0',
      endpoints: {
        POST: '/api/analyze-content - コンテンツからタグを提案',
      },
      parameters: {
        title: 'string - 記事タイトル',
        excerpt: 'string - 記事抜粋',
        content: 'string - 記事本文',
        options: {
          maxTags: 'number - 最大提案タグ数 (default: 6)',
          minConfidence: 'number - 最小信頼度 (default: 0.3)',
          includeNewTags: 'boolean - 新規タグを含めるか (default: true)',
          createNewTags: 'boolean - 新規タグを自動作成するか (default: false)'
        }
      }
    });
  } catch (healthError) {
    console.error('ヘルスチェックエラー:', healthError);
    return NextResponse.json(
      { error: 'ヘルスチェックに失敗しました' },
      { status: 500 }
    );
  }
}