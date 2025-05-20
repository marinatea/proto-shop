import { NextResponse } from 'next/server';
import { filters } from './filterData';

export async function GET() {
  try {
    return NextResponse.json(filters);
  } catch (error) {
    console.error('Error loading filters:', error);
    return NextResponse.json({ error: 'Failed to load filters' }, { status: 500 });
  }
}