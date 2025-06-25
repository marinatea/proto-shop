import { NextResponse } from 'next/server';
import { getProducts, getProductById } from '@/lib/woocommerce';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get('q')?.toLowerCase() || '';
  const id = url.searchParams.get('id');

  if (id) {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
    }
    try {
      const product = await getProductById(productId);
      return NextResponse.json(product);
    } catch {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
  }

  const products = await getProducts();

  const filteredTemplates = products.filter(
    (template) =>
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.author.toLowerCase().includes(query)
  );

  return NextResponse.json(filteredTemplates);
}
