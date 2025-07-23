import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/woocommerce';
import { updateProductById } from '@/lib/woocommerce';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;

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

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    const params = await context.params;

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const updatedData = await req.json();

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
