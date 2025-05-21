import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const res = await fetch(
      `${process.env.WOOCOMMERCE_URL}/wp-json/simple-jwt-login/v1/auth`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          AUTH_KEY: process.env.SIMPLE_JWT_SECRET_KEY
        })
      }
    );

    const data = await res.json();

    console.log('Response from WooCommerce:', data);

    if (!res.ok) {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }

    return NextResponse.json(data); // contains token, user data, etc.
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
