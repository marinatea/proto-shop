import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/woocommerce';
import { updateProductById } from '@/lib/woocommerce';

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    const product = await getProductById(Number(id));
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const updatedData = await req.json();

  // Opcjonalnie waliduj pola, które są wymagane, np. name, price, author
  if (!updatedData.name || !updatedData.price || !updatedData.author) {
    return NextResponse.json(
      { error: 'Name, price, and author are required!' },
      { status: 400 }
    );
  }

  try {
    const updatedProduct = await updateProductById(Number(id), updatedData);
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
