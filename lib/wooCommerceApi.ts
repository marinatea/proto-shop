import WooCommerceRestApi from 'woocommerce-rest-ts-api';

export function getWooApi(jwtToken: string) {
  return new WooCommerceRestApi({
    url: process.env.WOOCOMMERCE_URL!,
    consumerKey: '',
    consumerSecret: '',
    version: 'wc/v3',
    axiosConfigDefaults: {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  });
}

const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL!,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
  version: 'wc/v3'
});

export const getToken = async (email: string, password: string) => {
  try {
    const res = await fetch(
      `${process.env.WOOCOMMERCE_URL}/wp-json/simple-jwt-login/v1/auth`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          AUTH_KEY: process.env.SIMPLE_JWT_SECRET_KEY
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data; // contains token, user data, etc.
  } catch (error: any) {
    console.error('Error during login:', error);
    throw new Error('Login failed');
  }
};

export default api;
