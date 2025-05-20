import { NextResponse } from 'next/server';
import { products } from '../templatesData';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  console.log('Raw Context:', context);

  const params = await context.params;
  console.log('Resolved Params:', params);

  if (!params?.id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const product = products.find(
    (product) => product.id.toString() === params.id
  );

  if (!product) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const updatedProduct = await req.json();

  if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.author) {
    return NextResponse.json(
      { error: 'Name, price, and author are required!' },
      { status: 400 }
    );
  }

  const productIndex = products.findIndex(
    (product) => product.id.toString() === id
  );

  if (productIndex === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  products[productIndex] = { ...products[productIndex], ...updatedProduct };

  return NextResponse.json(products[productIndex], { status: 200 });
}
