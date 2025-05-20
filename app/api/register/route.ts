import api from '@/lib/wooCommerceApi';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('here');
  const body = await req.json();
  const { email, username, password, first_name, last_name } = body;

  try {
    const response = await api.post('customers', {
      email,
      username,
      password,
      first_name,
      last_name
    });
    console.log(response.data);

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
