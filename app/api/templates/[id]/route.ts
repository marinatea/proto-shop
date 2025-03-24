import { NextResponse } from 'next/server';
import { templates } from '../templatesData';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const template = templates.find((template) => template.id.toString() === id);

  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  return NextResponse.json(template);
}
