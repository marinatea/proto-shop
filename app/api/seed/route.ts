import { createProduct } from "@/lib/woocommerce";

export const dynamic = 'force-dynamic';

const seedProducts = [
  {
    name: 'Smartphone X Pro',
    images: [{ src: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp' }],
    status: 'publish',  // WooCommerce status: 'publish' zamiast 'active'
    regular_price: '999.00',
    stock_quantity: 150,
    date_available: new Date().toISOString(),
  },
  // ... pozostałe produkty w takim samym formacie
];

export async function GET() {
  try {
    for (const product of seedProducts) {
      await createProduct(product);
    }
    return new Response(JSON.stringify({ message: 'Data seeded successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Seeding failed', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
