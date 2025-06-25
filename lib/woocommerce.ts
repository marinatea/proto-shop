const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
console.log('WOOCOMMERCE_STORE_URL:', process.env.WOOCOMMERCE_STORE_URL);
console.log('WOOCOMMERCE_CONSUMER_KEY:', process.env.WOOCOMMERCE_CONSUMER_KEY);
console.log('WOOCOMMERCE_CONSUMER_SECRET:', process.env.WOOCOMMERCE_CONSUMER_SECRET);

const storeUrl = process.env.WOOCOMMERCE_STORE_URL;
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET!;

console.log('storeUrl:', storeUrl);
console.log('consumerKey:', consumerKey);
console.log('consumerSecret:', consumerSecret);

if (!storeUrl || !consumerKey || !consumerSecret) {
  throw new Error('Missing WooCommerce environment variables');
}

const api = new WooCommerceRestApi({
  url: storeUrl,
  consumerKey,
  consumerSecret,
  version: 'wc/v3'
});

export async function getProducts(
  perPage: number = 6,
  page: number = 1
): Promise<any[]> {
  const response = await api.get('products', { per_page: perPage, page });
  return response.data;
}

export async function getProductById(id: number): Promise<any> {
  const response = await api.get(`products/${id}`);
  return response.data;
}

export async function updateProductById(id: number, data: any): Promise<any> {
  const response = await api.put(`products/${id}`, data);
  return response.data;
}

export async function createProduct(data: any): Promise<any> {
  try {
    const response = await api.post('products', data);
    return response.data;
  } catch (error: any) {
    console.error('WooCommerce API error (createProduct):', {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message
    });
    throw new Error('Failed to create product');
  }
}
