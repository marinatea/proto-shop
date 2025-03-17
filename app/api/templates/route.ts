import { NextResponse } from 'next/server';

const templates = [
  {
    id: 1,
    name: 'Template 1',
    description: 'This is a short description of Template 1.',
    image: 'https://via.placeholder.com/300',
    author: 'User 1',
    demoLink: 'https://example.com'
  },
  {
    id: 2,
    name: 'Template 2',
    description: 'This is a short description of Template 2.',
    image: 'https://via.placeholder.com/300',
    author: 'User 2',
    demoLink: 'https://example.com'
  },
  {
    id: 3,
    name: 'Template 3',
    description: 'This is a short description of Template 3.',
    image: 'https://via.placeholder.com/300',
    author: 'User 3',
    demoLink: 'https://example.com'
  },
  {
    id: 4,
    name: 'Template 4',
    description: 'This is a short description of Template 4.',
    image: 'https://via.placeholder.com/300',
    author: 'User 4',
    demoLink: 'https://example.com'
  },
  {
    id: 5,
    name: 'Template 5',
    description: 'This is a short description of Template 5.',
    image: 'https://via.placeholder.com/300',
    author: 'User 5',
    demoLink: 'https://example.com'
  },
  {
    id: 6,
    name: 'Template 6',
    description: 'This is a short description of Template 6.',
    image: 'https://via.placeholder.com/300',
    author: 'User 6',
    demoLink: 'https://example.com'
  },
  {
    id: 7,
    name: 'Template 7',
    description: 'This is a short description of Template 7.',
    image: 'https://via.placeholder.com/300',
    author: 'User 7',
    demoLink: 'https://example.com'
  },
  {
    id: 8,
    name: 'Template 8',
    description: 'This is a short description of Template 8.',
    image: 'https://via.placeholder.com/300',
    author: 'User 8',
    demoLink: 'https://example.com'
  },
  {
    id: 9,
    name: 'Template 9',
    description: 'This is a short description of Template 9.',
    image: 'https://via.placeholder.com/300',
    author: 'User 9',
    demoLink: 'https://example.com'
  },
  {
    id: 10,
    name: 'Template 10',
    description: 'This is a short description of Template 10.',
    image: 'https://via.placeholder.com/300',
    author: 'User 10',
    demoLink: 'https://example.com'
  }
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get('q')?.toLowerCase() || '';

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.author.toLowerCase().includes(query)
  );

  return NextResponse.json(filteredTemplates);
}