const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // 書き込み権限のあるトークンが必要
  useCdn: false,
  apiVersion: '2023-01-01',
});

// スラッグの文字列を正規化する関数
function normalizeSlug(slug) {
  // URLが含まれている場合、最後のパス部分を抽出
  if (slug.includes('://')) {
    const parts = slug.split('/');
    return parts[parts.length - 1] || 'untitled';
  }
  
  // スラッシュが含まれている場合、最後の部分を抽出
  if (slug.includes('/')) {
    const parts = slug.split('/');
    return parts[parts.length - 1] || 'untitled';
  }
  
  // 既に正規化されている場合はそのまま返す
  return slug;
}

// スラッグの文字列を生成する関数
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 特殊文字を除去
    .replace(/[\s_-]+/g, '-') // スペース、アンダースコア、ハイフンをハイフンに変換
    .replace(/^-+|-+$/g, ''); // 先頭と末尾のハイフンを除去
}

async function fixSlugs() {
  try {
    console.log('問題のあるスラッグを検索中...');
    
    // スラッグが空、null、またはURLを含む記事を取得
    const problematicPosts = await client.fetch(`
      *[_type == "post" && (!defined(slug.current) || slug.current match "*://*" || slug.current match "*/*")] {
        _id,
        title,
        slug
      }
    `);

    console.log(`${problematicPosts.length}件の記事のスラッグを修正します`);

    for (const post of problematicPosts) {
      let newSlug;
      
      if (post.slug?.current) {
        // 既存のスラッグを正規化
        newSlug = normalizeSlug(post.slug.current);
        console.log(`記事「${post.title}」のスラッグを「${post.slug.current}」から「${newSlug}」に正規化中...`);
      } else if (post.title) {
        // タイトルから新しいスラッグを生成
        newSlug = generateSlug(post.title);
        console.log(`記事「${post.title}」にスラッグ「${newSlug}」を新規生成中...`);
      } else {
        console.log(`記事 ${post._id} にはタイトルがないためスキップします`);
        continue;
      }
      
      // スラッグを更新
      await client
        .patch(post._id)
        .set({
          slug: {
            _type: 'slug',
            current: newSlug
          }
        })
        .commit();
      
      console.log(`✅ 記事「${post.title}」のスラッグを更新しました`);
    }

    console.log('✅ すべてのスラッグ修正が完了しました！');
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
  }
}

fixSlugs();