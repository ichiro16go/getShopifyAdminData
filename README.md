# getShopifyAdminData
shopifyAPIからカート追加、チェックアウトの情報だけ抜き出すだけのやつです。
## セットアップ・使用方法
### 1. moduleのinstall
ターミナル上で`npm i`
### 2. 環境変数ファイルの作成
同ディレクトリ内に.envを作成し
```enviroment
SHOPIFY_ACCESS_TOKEN=//アクセストークン
SHOPIFY_STORE_NAME=//ストアネーム
SHOPIFY_API_KEY = //APIキー
SHOPIFY_API_PASSWORD = //APIシークレットキー
```
### 3. 実行
`node shopifyDataFEtch.js`を実行