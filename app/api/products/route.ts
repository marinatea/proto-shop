import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';
import { getProductById } from '@/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get('q')?.toLowerCase() || '';
  const id = url.searchParams.get('id');

  const products = await getProducts();

  if (id) {
    const template = products.find((template) => template.id.toString() === id);
    if (template) {
      return NextResponse.json(template);
    } else {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
  }

  const filteredTemplates = products.filter(
    (template) =>
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.author.toLowerCase().includes(query)
  );

  return NextResponse.json(filteredTemplates);
}
