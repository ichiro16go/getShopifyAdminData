const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; // .envファイルからアクセストークンを取得
const SHOPIFY_STORE_NAME = process.env.SHOPIFY_STORE_NAME; // .envファイルからストア名を取得

const fetchShopifyData = async () => {
    try {
        const baseUrl = `https://${SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2023-10`;

        // カートに追加済みのデータを取得
        const cartResponse = await axios.get(`${baseUrl}/checkouts.json`, {
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
            }
        });
        const cartData = cartResponse.data;

        // チェックアウトに到達済みのデータを取得
        const checkoutResponse = await axios.get(`${baseUrl}/orders.json`, {
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
            }
        });
        const checkoutData = checkoutResponse.data;


        //作成日時取得
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD形式にフォーマット

        //checkoutのデータをjson形式で出力
        const cartDir = path.join(__dirname, 'cartData');
        if (!fs.existsSync(cartDir)) {
            fs.mkdirSync(cartDir);
        }
        const cartPath = path.join(cartDir, `cartData_${formattedDate}.json`)
        fs.writeFile(cartPath, JSON.stringify(cartData, null, 2), (err) => {
            if (err) {
                console.error('failed to create JSON file:', err);
            } else {
                console.log('created cartData.json file!');
            }
        });

        //checkoutのデータをjson形式で出力
        const checkoutDir = path.join(__dirname, 'checkoutData');
        if (!fs.existsSync(checkoutDir)) {
            fs.mkdirSync(checkoutDir);
        }
        const checkoutPath = path.join(checkoutDir, `checkoutData_${formattedDate}.json`)
        fs.writeFile(checkoutPath, JSON.stringify(checkoutData, null, 2), (err) => {
            if (err) {
                console.error('failed to create JSON file:', err);
            } else {
                console.log('created checkoutData.json file!');
            }
        });

    } catch (error) {
        console.error('データの取得に失敗しました:', error);
    }
};



fetchShopifyData();



// const fetchShopifyData = async () => {
//   try {
//     const baseUrl = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2023-10`;

//     // カートに追加済みのデータを取得
//     const cartResponse = await axios.get(`${baseUrl}/checkouts.json`);
//     const cartData = cartResponse.data;
//     console.log('カートに追加済みのデータ:', cartData);

//     // チェックアウトに到達済みのデータを取得
//     const checkoutResponse = await axios.get(`${baseUrl}/orders.json`);
//     const checkoutData = checkoutResponse.data;
//     console.log('チェックアウトに到達済みのデータ:', checkoutData);

//     // ページビューのデータを取得
//     // Shopify Admin APIでは直接ページビューのデータを取得するエンドポイントはありません。
//     // そのため、Google Analyticsなどの外部サービスを利用する必要があります。
//     // ここでは仮にGoogle Analyticsのデータを取得する例を示します。
//     const googleAnalyticsData = await fetchGoogleAnalyticsData();
//     console.log('ページビューのデータ:', googleAnalyticsData);

//   } catch (error) {
//     console.error('データの取得に失敗しました:', error);
//   }
// };

// const fetchGoogleAnalyticsData = async () => {
//   // Google Analytics APIを使ってデータを取得する処理をここに書きます。
//   // ここでは仮のデータを返します。
//   return {
//     pageViews: 1234,
//     sessions: 567,
//   };
// };

// fetchShopifyData();