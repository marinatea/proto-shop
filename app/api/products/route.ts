import api from '@/lib/wooCommerceApi';
import { NextResponse } from 'next/server';
import { Product } from 'types/wooCommerceTypes';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get('q')?.toLowerCase() || '';
  const idStr = url.searchParams.get('id');
  const id = idStr ? +idStr : undefined;

  console.log(query);

  // if (id) {
  //   const template = products.find((template) => template.id.toString() === id);
  //   if (template) {
  //     return NextResponse.json(template);
  //   } else {
  //     return NextResponse.json(
  //       { error: 'Template not found' },
  //       { status: 404 }
  //     );
  //   }
  // }

  // const filteredTemplates = products.filter(
  //   (template) =>
  //     template.name.toLowerCase().includes(query) ||
  //     template.description.toLowerCase().includes(query) ||
  //     template.author.toLowerCase().includes(query)
  // );

  // return NextResponse.json(filteredTemplates);
  try {
    const response = await api.get('products', {
      id: id
    });

    console.log('Response from WooCommerce:', query, id);

    return NextResponse.json(response.data as Product[]);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
