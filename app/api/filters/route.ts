import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'filters.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const filters = JSON.parse(fileContents);

    return NextResponse.json(filters);
  } catch (error) {
    console.error('Error loading filters:', error);
    return NextResponse.json({ error: 'Failed to load filters' }, { status: 500 });
  }
}
