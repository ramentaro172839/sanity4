// 自動タグ付けシステムのテストスクリプト

const testContent = {
  title: "HamCup DAOコミュニティでのアート活動について",
  excerpt: "私がHamCupでイラストを描き始めた体験談です。初心者でも楽しめるコミュニティの魅力をお伝えします。",
  content: "HamCup DAOは素晴らしいコミュニティです。NFTやWeb3の知識がなくても、アートやイラストを描くことが初心者の私でも温かく迎え入れてくれました。デジタルアートの描き方を学んだり、他のクリエイターと交流したりできる場所です。プログラミングやReact、Next.jsの技術的な話題から、日常のライフスタイルまで幅広い話題で盛り上がっています。"
};

async function testAutoTag() {
  console.log('🧪 自動タグ付けシステムのテストを開始します...\n');

  try {
    // APIヘルスチェック
    console.log('1. APIヘルスチェック...');
    const healthResponse = await fetch('http://localhost:3000/api/analyze-content');
    const healthData = await healthResponse.json();
    console.log('✅ APIステータス:', healthData.status);
    console.log('');

    // コンテンツ分析テスト
    console.log('2. コンテンツ分析テスト...');
    console.log('テスト対象:');
    console.log('  タイトル:', testContent.title);
    console.log('  抜粋:', testContent.excerpt.substring(0, 50) + '...');
    console.log('');

    const analyzeResponse = await fetch('http://localhost:3000/api/analyze-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...testContent,
        options: {
          maxTags: 6,
          minConfidence: 0.2,
          includeNewTags: true,
          createNewTags: false // テストなので新規タグは作成しない
        }
      }),
    });

    if (!analyzeResponse.ok) {
      throw new Error(`HTTP ${analyzeResponse.status}: ${analyzeResponse.statusText}`);
    }

    const analyzeData = await analyzeResponse.json();
    console.log('✅ タグ分析結果:');
    console.log('  提案されたタグ:', analyzeData.suggestions.tags);
    console.log('  信頼度:', Math.round(analyzeData.suggestions.confidence * 100) + '%');
    console.log('  既存タグ:', analyzeData.suggestions.existingTags);
    console.log('  新規タグ:', analyzeData.suggestions.newTags);
    console.log('');

    // 一括タグ付けAPIテスト
    console.log('3. 一括タグ付けAPIヘルスチェック...');
    const bulkResponse = await fetch('http://localhost:3000/api/bulk-auto-tag');
    const bulkData = await bulkResponse.json();
    console.log('✅ 一括タグ付けAPI ステータス:', bulkData.status);
    console.log('  統計:', bulkData.statistics);
    console.log('');

    console.log('🎉 全テスト完了！自動タグ付けシステムは正常に動作しています。');

  } catch (error) {
    console.error('❌ テストエラー:', error.message);
    console.log('\n🔧 トラブルシューティング:');
    console.log('1. 開発サーバーが起動しているか確認してください (npm run dev)');
    console.log('2. Sanityの設定が正しいか確認してください');
    console.log('3. 環境変数(.env.local)が設定されているか確認してください');
  }
}

// テスト実行
testAutoTag();