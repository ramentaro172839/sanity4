# 手動更新ガイド（Webhook代替案）

## 概要
SanityのWebhook機能が利用できない場合の代替として、手動でサイトキャッシュを更新する方法を提供します。

## 🔧 利用可能な更新方法

### 1. **ブラウザでの簡単更新**
ブログ記事を更新した後、以下のURLにアクセスしてキャッシュを更新：

```
http://localhost:3000/api/manual-revalidate?key=manual-update
```

### 2. **ターミナルでの更新**
```bash
curl "http://localhost:3000/api/manual-revalidate?key=manual-update"
```

### 3. **特定記事の更新**
```bash
curl -X POST "http://localhost:3000/api/manual-revalidate?key=manual-update" \
  -H "Content-Type: application/json" \
  -d '{"slug": "記事のスラッグ名"}'
```

## 📋 更新手順

### Sanityでブログ記事を更新した場合：

1. **Sanity Studioで記事を編集・保存**
2. **ブラウザで以下のURLにアクセス**：
   ```
   http://localhost:3000/api/manual-revalidate?key=manual-update
   ```
3. **成功メッセージを確認**：
   ```json
   {
     "success": true,
     "message": "Manual cache refresh completed",
     "timestamp": "2025-07-07T05:40:00.000Z"
   }
   ```
4. **サイトで変更が反映されていることを確認**

## 🚀 本番環境での利用

本番環境では、URLを本番ドメインに変更してください：

```
https://yourdomain.com/api/manual-revalidate?key=manual-update
```

## 📱 ブックマーク推奨

頻繁に使用する場合は、以下のURLをブラウザにブックマークしておくと便利です：

- **開発環境**: `http://localhost:3000/api/manual-revalidate?key=manual-update`
- **本番環境**: `https://yourdomain.com/api/manual-revalidate?key=manual-update`

## 🔄 自動化オプション

### Sanity Studio カスタムアクション（上級者向け）
Sanity Studioにカスタムボタンを追加して、記事保存時に自動的に更新APIを呼び出すことも可能です。

## ⚠️ 注意事項

- **セキュリティ**: 本番環境では、より強固な認証キーの設定を推奨
- **頻度制限**: 過度な呼び出しは避けてください
- **キャッシュ時間**: 通常60秒でキャッシュが自動更新されますが、即座に反映したい場合にこの方法を使用

## 💡 Webhook との違い

| 項目 | Webhook | 手動更新 |
|------|---------|----------|
| **自動化** | 完全自動 | 手動操作必要 |
| **即時性** | 即座 | 手動実行時 |
| **設定** | Sanity側設定必要 | 設定不要 |
| **プラン制限** | 有料プラン | 制限なし |

この手動更新方式により、Webhook機能が利用できない環境でも、ブログ記事の変更を確実にサイトに反映させることができます。