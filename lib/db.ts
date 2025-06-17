// // lib/db.ts
// import 'server-only';

const storeUrl = process.env.WOOCOMMERCE_STORE_URL!;
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY!;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET!;

// const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

// export async function getProducts(
//   perPage: number = 6,
//   page: number = 1
// ): Promise<any[]> {
//   const url = `${storeUrl}/wp-json/wc/v3/products?per_page=${perPage}&page=${page}`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Basic ${auth}`
//     }
//   });

//   if (!res.ok) {
//     throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
//   }

//   const products = await res.json();

//   return products;
// }

// /**
//  * Placeholder usuwania produktu (niezaimplementowane)
//  */
// export async function deleteProductById(id: number) {
//   console.warn(
//     'deleteProductById is not implemented in WooCommerce-only mode.'
//   );
//   return;
// }

const WooCommerceRestApi =
  require('@woocommerce/woocommerce-rest-api ').default;

const api = new WooCommerceRestApi({
  url: 'storeUrl',
  consumerKey: 'consumerKey',
  consumerSecret: 'consumerSecret',
  version: 'wc/v3'
});
