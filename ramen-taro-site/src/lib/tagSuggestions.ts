// タグ提案機能

import { client } from '../../lib/sanity';
import { analyzeContentForTags, ContentToAnalyze, TagAnalysisResult } from './tagAnalyzer';

export interface TagSuggestionOptions {
  maxTags?: number;
  minConfidence?: number;
  includeNewTags?: boolean;
}

/**
 * Sanityから既存タグを取得
 */
export async function getExistingTags(): Promise<string[]> {
  try {
    const tags = await client.fetch(`
      *[_type == "tag"] {
        title
      }
    `);
    
    return tags.map((tag: { title: string }) => tag.title);
  } catch (error) {
    console.error('既存タグの取得に失敗:', error);
    return [];
  }
}

/**
 * 記事IDから既存のタグを取得
 */
export async function getPostTags(postId: string): Promise<string[]> {
  try {
    const post = await client.fetch(`
      *[_type == "post" && _id == $postId][0] {
        tags[]-> {
          title
        }
      }
    `, { postId });
    
    return post?.tags?.map((tag: { title: string }) => tag.title) || [];
  } catch (error) {
    console.error('記事タグの取得に失敗:', error);
    return [];
  }
}

/**
 * 新しいタグをSanityに作成
 */
export async function createNewTags(tagTitles: string[]): Promise<{ _id: string; title: string }[]> {
  const createdTags: { _id: string; title: string }[] = [];
  
  for (const title of tagTitles) {
    try {
      // 既存チェック
      const existing = await client.fetch(`
        *[_type == "tag" && title == $title][0]
      `, { title });
      
      if (existing) {
        createdTags.push(existing);
        continue;
      }
      
      // 新規作成
      const newTag = await client.create({
        _type: 'tag',
        title,
        slug: {
          _type: 'slug',
          current: title.toLowerCase()
            .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/gi, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        },
        color: '#3b82f6' // デフォルトブルー
      });
      
      createdTags.push(newTag);
    } catch (error) {
      console.error(`タグ "${title}" の作成に失敗:`, error);
    }
  }
  
  return createdTags;
}

/**
 * 記事にタグを自動適用
 */
export async function applyTagsToPost(
  postId: string, 
  tagIds: string[]
): Promise<boolean> {
  try {
    await client
      .patch(postId)
      .set({
        tags: tagIds.map(id => ({ _type: 'reference', _ref: id })),
        autoTagged: true,
        autoTaggedAt: new Date().toISOString()
      })
      .commit();
    
    return true;
  } catch (error) {
    console.error('タグの適用に失敗:', error);
    return false;
  }
}

/**
 * メインのタグ提案関数
 */
export async function suggestTagsForContent(
  content: ContentToAnalyze,
  options: TagSuggestionOptions = {}
): Promise<TagAnalysisResult & { tagReferences?: { _id: string; title: string }[] }> {
  const {
    maxTags = 6,
    minConfidence = 0.3,
    includeNewTags = true
  } = options;
  
  // 既存タグを取得
  const existingTags = await getExistingTags();
  
  // コンテンツ分析
  const analysis = analyzeContentForTags(content, existingTags);
  
  // 信頼度チェック
  if (analysis.confidence < minConfidence) {
    console.warn(`タグ提案の信頼度が低すぎます: ${analysis.confidence}`);
  }
  
  // 提案タグを制限
  let finalTags = analysis.suggestedTags.slice(0, maxTags);
  
  // 新規タグを除外する場合
  if (!includeNewTags) {
    finalTags = analysis.existingTags.slice(0, maxTags);
  }
  
  // タグ参照情報を取得
  const tagReferences: { _id: string; title: string }[] = [];
  
  for (const tagTitle of finalTags) {
    try {
      const tagRef = await client.fetch(`
        *[_type == "tag" && title == $title][0] {
          _id,
          title
        }
      `, { title: tagTitle });
      
      if (tagRef) {
        tagReferences.push(tagRef);
      }
    } catch (error) {
      console.error(`タグ参照の取得に失敗: ${tagTitle}`, error);
    }
  }
  
  return {
    ...analysis,
    suggestedTags: finalTags,
    tagReferences
  };
}

/**
 * 全記事の自動タグ付けを実行
 */
export async function bulkAutoTag(): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;
  
  try {
    // タグ付けされていない記事を取得
    const posts = await client.fetch(`
      *[_type == "post" && !defined(autoTagged)] {
        _id,
        title,
        excerpt,
        content
      }
    `);
    
    for (const post of posts) {
      try {
        const content: ContentToAnalyze = {
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: Array.isArray(post.content) 
            ? post.content.map((block: { children?: { text: string }[] }) => 
                block.children?.map((child: { text: string }) => child.text).join(' ') || ''
              ).join(' ')
            : post.content || ''
        };
        
        const suggestions = await suggestTagsForContent(content, {
          maxTags: 5,
          minConfidence: 0.4,
          includeNewTags: true
        });
        
        if (suggestions.newTags.length > 0) {
          await createNewTags(suggestions.newTags);
        }
        
        const tagIds = suggestions.tagReferences?.map(ref => ref._id) || [];
        
        if (tagIds.length > 0) {
          await applyTagsToPost(post._id, tagIds);
          success++;
        }
        
      } catch (error) {
        console.error(`記事 ${post._id} の自動タグ付けに失敗:`, error);
        failed++;
      }
    }
    
  } catch (error) {
    console.error('一括自動タグ付けに失敗:', error);
  }
  
  return { success, failed };
}