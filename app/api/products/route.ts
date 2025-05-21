import api from '@/lib/wooCommerceApi';
import { NextResponse } from 'next/server';
import { Template } from 'types/types';
import { Product } from 'types/wooCommerceTypes';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const idStr = url.searchParams.get('id');
  const id = idStr ? +idStr : undefined;

  try {
    const response: { data: Template[] } = await api.get('products', {
      id: id
    });

    return NextResponse.json(response.data as Template[]);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
