'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Template } from 'types/types';

export default function TemplateDetail() {
  const { id } = useParams();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTemplate = async () => {
      try {
        const response = await fetch(`/api/templates/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch template');
        }
        const data: Template = await response.json();
        setTemplate(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching template:', error);
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!template) return <div>Template not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">{template?.name}</h1>
      <img
        src={template?.image}
        alt={template?.name}
        className="w-full h-64 object-cover my-4"
      />
      <p>{template?.description}</p>
      <p className="mt-4 text-sm text-gray-500">Created by {template.author}</p>
      <a
        href={template?.demoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-blue-400 hover:text-blue-500"
      >
        View Demo
      </a>
    </div>
  );
}
