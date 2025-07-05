const API_URL = 'http://localhost:3001/api/blog/auto-post';
const API_KEY = 'ramen-taro-auto-post-secret-2025';

async function testAutoPost() {
  try {
    console.log('自動投稿テスト開始...');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ 自動投稿成功!');
      console.log('投稿詳細:', result.post);
      console.log(`記事URL: http://localhost:3001/blog/${result.post.slug}`);
    } else {
      console.log('❌ 自動投稿失敗:', result.error);
    }

  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

testAutoPost();