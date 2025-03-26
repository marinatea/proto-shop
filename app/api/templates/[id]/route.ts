import { NextResponse } from 'next/server';
import { templates } from '../templatesData';

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

  const template = templates.find(
    (template) => template.id.toString() === params.id
  );

  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  return NextResponse.json(template);
}
