# Sanity Webhook 設定ガイド

## 概要
このガイドでは、ブログ記事の変更を自動でサイトに反映させるためのSanity Webhookの設定方法を説明します。

## 1. 環境変数の確認

### 開発環境
`.env.local` ファイルに以下が設定されていることを確認してください：

```env
SANITY_REVALIDATION_SECRET=b54502f27d70c07cf2024ff215d523dce28aa77461baa8658f3216e0e3cc916d
```

### 本番環境
Vercelの環境変数設定で以下を追加してください：

```
SANITY_REVALIDATION_SECRET=b54502f27d70c07cf2024ff215d523dce28aa77461baa8658f3216e0e3cc916d
```

## 2. Sanity Studio での Webhook 設定

### 手順 1: Sanity Manage にアクセス
1. [Sanity Manage](https://www.sanity.io/manage) にアクセス
2. プロジェクト `0d5afprf` を選択
3. 左メニューから「API」をクリック
4. 「Webhooks」タブを選択

### 手順 2: 新しい Webhook を作成

#### 開発環境用 Webhook（テスト用）
- **Name**: `Development Auto Revalidation`
- **URL**: `http://localhost:3000/api/revalidate?secret=b54502f27d70c07cf2024ff215d523dce28aa77461baa8658f3216e0e3cc916d`
- **Dataset**: `production`
- **Trigger on**: 
  - ✅ Create
  - ✅ Update
  - ✅ Delete
- **Filter**: `_type == "post" || _type == "category" || _type == "tag"`
- **Projection**: `{ _type, slug }`
- **HTTP method**: `POST`

#### 本番環境用 Webhook
- **Name**: `Production Auto Revalidation`
- **URL**: `https://yourdomain.com/api/revalidate?secret=b54502f27d70c07cf2024ff215d523dce28aa77461baa8658f3216e0e3cc916d`
- **Dataset**: `production`
- **Trigger on**: 
  - ✅ Create
  - ✅ Update
  - ✅ Delete
- **Filter**: `_type == "post" || _type == "category" || _type == "tag"`
- **Projection**: `{ _type, slug }`
- **HTTP method**: `POST`

## 3. テスト方法

### 開発環境でのテスト
1. 開発サーバーを起動: `npm run dev`
2. Sanity Studio でブログ記事のタイトルを変更
3. 保存後、サイトが自動更新されることを確認

### 手動テスト（開発環境）
以下のコマンドでWebhookをテストできます：

```bash
curl -X POST "http://localhost:3000/api/revalidate?secret=b54502f27d70c07cf2024ff215d523dce28aa77461baa8658f3216e0e3cc916d" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "post",
    "slug": {
      "current": "test-post"
    }
  }'
```

成功時のレスポンス例：
```json
{
  "revalidated": true,
  "now": 1704067200000,
  "paths": ["/blog", "/", "/blog/test-post"]
}
```

## 4. 対象ページの自動更新

Webhookが正常に動作すると、以下のページが自動更新されます：

### 記事関連
- **ホームページ** (`/`): 最新記事一覧
- **ブログ一覧** (`/blog`): 全記事一覧
- **個別記事ページ** (`/blog/[slug]`): 該当記事
- **カテゴリーページ** (`/blog/category/[slug]`): カテゴリー別記事一覧
- **タグページ** (`/blog/tag/[slug]`): タグ別記事一覧

### 更新タイミング
- **リアルタイム**: Webhook経由での即座更新
- **フォールバック**: 60秒間隔での自動更新（ISR）

## 5. トラブルシューティング

### Webhook が動作しない場合
1. **URL の確認**: 正しいドメインとシークレットキーが設定されているか
2. **環境変数の確認**: `SANITY_REVALIDATION_SECRET` が正しく設定されているか
3. **Filter の確認**: `_type == "post" || _type == "category" || _type == "tag"` が設定されているか
4. **ログの確認**: サーバーログでエラーが発生していないか

### ログの確認方法
開発環境では以下でサーバーログを確認できます：
```bash
tail -f ramen-taro-site/server.log
```

### よくあるエラー
- **401 Unauthorized**: シークレットキーが間違っている
- **500 Internal Server Error**: 環境変数が設定されていない
- **404 Not Found**: Webhook URLが間違っている

## 6. セキュリティ注意事項

- **シークレットキーの管理**: 絶対に公開リポジトリにコミットしないでください
- **定期的な更新**: セキュリティのため、シークレットキーを定期的に変更してください
- **アクセス制限**: 必要に応じてIP制限も検討してください

## 7. 本番環境へのデプロイ時の注意

1. Vercelの環境変数に `SANITY_REVALIDATION_SECRET` を設定
2. 本番ドメインでWebhook URLを更新
3. 開発環境用Webhookは無効化またはフィルタで制限
4. 本番環境でのテストを実施

---

## サポート

問題が発生した場合は、以下の情報を含めて報告してください：
- Webhook設定のスクリーンショット
- エラーログ
- 実行時のブラウザコンソールログ
- 試した操作の詳細