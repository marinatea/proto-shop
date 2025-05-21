import api from '@/lib/wooCommerceApi';
import { NextResponse } from 'next/server';
import { Template } from 'types/types';
import { WooRestApiEndpoint } from 'woocommerce-rest-ts-api';

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

  const product = api.get('products', {
    id: +params.id
  });

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

  if (
    !updatedProduct.name ||
    !updatedProduct.acf.price ||
    !updatedProduct.acf.author
  ) {
    return NextResponse.json(
      { error: 'Name, price, and author are required!' },
      { status: 400 }
    );
  }

  try {
    const response = await api.put<WooRestApiEndpoint>(
      'products',
      updatedProduct,
      {
        id: +id
      }
    );

    if (!response) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(response.data as Template);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}
