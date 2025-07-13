# トラブルシューティング

このファイルでは、開発中に発生したトラブルとその解決方法を記録します。

## 🔥 緊急度高：Next.js + Turbopack キャッシュ問題

### 症状
- ファイルを修正したが、ブラウザで変更が反映されない
- curlコマンドでも古いコンテンツが返される
- TypeScriptエラーなし、ファイル内容も正しい

### 発生日時
2025年7月14日

### 発生環境
- Next.js 15.3.5 with Turbopack
- 開発サーバー（`npm run dev --turbopack`）

### 根本原因
**Next.js Turbopackの積極的なキャッシュ機能**により、ファイル変更が検知されずに古いコンテンツが配信される問題。

### 調査手順
1. ファイル内容確認 → 正しく修正されている
2. TypeScriptエラーチェック → エラーなし
3. 開発サーバープロセス確認 → 実行中
4. 診断ツールでエラー確認 → エラーなし
5. **結論：キャッシュ問題**

### 解決手順

#### 1. 開発サーバープロセス停止
```bash
# プロセス確認
ps aux | grep "next"

# 該当プロセスを停止
kill [PID]
```

#### 2. キャッシュクリア
```bash
# .nextフォルダ削除（重要）
rm -rf .next
```

#### 3. 開発サーバー再起動
```bash
npm run dev
```

### 予防策

#### A. 定期的なハードリフレッシュ
ファイル変更後は以下を実行：
- ブラウザでCtrl+Shift+R (Cmd+Shift+R)
- または完全キャッシュクリア

#### B. 段階的な変更確認
重要な変更時は以下で確認：
```bash
# サーバー側コンテンツ確認
curl -s localhost:3000/[path] | grep "[検索文字列]"
```

#### C. 開発環境でのキャッシュ無効化設定
Next.js設定でキャッシュを弱める（パフォーマンスとトレードオフ）：
```javascript
// next.config.js
module.exports = {
  experimental: {
    turbopack: {
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
    }
  }
}
```

### 関連技術情報

#### Next.js Turbopack キャッシュ仕様
- 開発時でも積極的にキャッシュを行う
- ファイル変更検知が失敗する場合がある
- 特にTypeScript定数ファイルの変更で顕著

#### 影響範囲
- すべてのページコンポーネント
- 定数ファイル（constants/）
- TypeScriptファイル全般

### 参考情報
- [Next.js Turbopack Documentation](https://nextjs.org/docs/architecture/turbopack)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)

---

## ✅ 解決済み事例

### プロフィール文章統一問題
**発生日**: 2025年7月14日  
**症状**: ホームページとプロフィールページで文章内容が異なる  
**原因**: ハードコーディングされた文章 + Turbopackキャッシュ  
**解決**: 定数ファイル作成 + キャッシュクリア

---

*最終更新: 2025年7月14日*