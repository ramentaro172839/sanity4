# モバイルアクセス問題解決ガイド

## 問題の概要
Next.jsローカル開発環境にiPhoneなどのモバイルデバイスからアクセスできない問題の解決方法をまとめています。

## 根本原因の分析

### 1. Next.js開発サーバーのデフォルト設定
**問題**: Next.jsは既定で`localhost`（127.0.0.1）でのみリッスンする
- `next dev`実行時、サーバーは`localhost:3000`でのみアクセス可能
- 外部デバイス（iPhone、Android等）からの接続を受け付けない

**解決**: `--hostname 0.0.0.0`オプションで全インターフェースでリッスン
```bash
next dev --hostname 0.0.0.0
```

### 2. ネットワーク設定の制約
**確認項目**:
- PCとモバイルデバイスが同一Wi-Fiネットワークに接続されているか
- PCのローカルIPアドレスが正確か
- ファイアウォール設定がポート3000をブロックしていないか

## 解決手順

### Step 1: package.json設定変更
```json
{
  "scripts": {
    "dev": "next dev --turbopack --hostname 0.0.0.0",
    "dev:local": "next dev --turbopack"
  }
}
```

### Step 2: PCのローカルIPアドレス確認
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```
例: `inet 192.168.11.10`

### Step 3: ファイアウォール状態確認
```bash
/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
```

### Step 4: サーバー起動とテスト
```bash
# 開発サーバー起動
npm run dev

# リスニング状態確認
netstat -an | grep LISTEN | grep 3000

# ローカルアクセステスト
curl -s -o /dev/null -w "%{http_code}" http://[ローカルIP]:3000
```

### Step 5: モバイルデバイスからアクセス
iPhoneのSafariで以下にアクセス:
```
http://[PCのローカルIP]:3000
```
例: `http://192.168.11.10:3000`

## トラブルシューティング

### 接続できない場合の確認事項

1. **サーバー起動状態確認**
   ```bash
   ps aux | grep next
   netstat -an | grep 3000
   ```

2. **ネットワーク接続確認**
   - PCとモバイルが同じWi-Fiに接続されているか
   - IPアドレスが正確か（192.168.x.x等）

3. **ファイアウォール確認**
   ```bash
   # macOS Application Firewall
   /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
   
   # 必要に応じて無効化
   sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off
   ```

4. **ポート使用状況確認**
   ```bash
   lsof -i :3000
   ```

### よくあるエラーと対処法

#### "サーバーに接続できませんでした"
- **原因**: サーバーが`localhost`でのみリッスンしている
- **解決**: `--hostname 0.0.0.0`オプションでサーバー再起動

#### "Internal Server Error"
- **原因**: 環境変数やビルド設定の問題
- **解決**: `.env.local`設定確認、`npm run build`実行

#### 接続はできるが表示が崩れる
- **原因**: モバイル向けCSSが適用されていない
- **解決**: レスポンシブデザインの実装確認

## 本番環境での推奨事項

### 1. Vercelデプロイ設定
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev"
}
```

### 2. 環境変数設定
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://192.168.11.10:3000
NEXT_PUBLIC_VERCEL_URL=${VERCEL_URL}
```

### 3. モバイル対応自動テスト
```yaml
# .github/workflows/mobile-test.yml
name: Mobile Compatibility Test
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Lighthouse CI
        run: |
          npm ci
          npm run build
          npx lighthouse --chrome-flags="--headless" --preset=perf,a11y --view
```

## まとめ

モバイルアクセス問題の主要因は**Next.js開発サーバーのホスト設定**です。

**重要ポイント**:
1. `--hostname 0.0.0.0`でサーバー起動
2. PCとモバイルが同一ネットワーク接続
3. 正確なローカルIPアドレス使用
4. ファイアウォール設定確認

これらの設定により、開発環境でのモバイルテストが効率的に行えるようになります。

---
作成日: 2025年7月14日  
更新日: 2025年7月14日  
作成者: らーめん太郎開発チーム