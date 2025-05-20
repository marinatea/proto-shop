import WooCommerceRestApi from 'woocommerce-rest-ts-api';

const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL!,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
  version: 'wc/v3'
});

export const getProducts = async () => {
  const res = await api.get('products');

  return res.data as Products[];
};

const getCustomers = async () => {
  const res = await api.get('customers');

  return res.data as CustomersParams[];
};

export default api;
