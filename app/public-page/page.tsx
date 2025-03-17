// pages/public-page.tsx
'use client';
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/shared/header';
import TemplateCard from '@/components/public-page/templateCard';
import Filters from '@/components/public-page/filters';
import { FilterState } from 'types/types';

export default function PublicPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [filters, setFilters] = useState<FilterState>({
    filter1: false,
    filter2: false,
    filter3: false,
    filter4: false,
    filter5: false,
    filter6: false,
    filter7: false
  });

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.role === 'admin') {
        router.push('/admin/admin');
      } else {
        router.push('/user/user');
      }
    } else {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data = await response.json();
        setTemplates(data);
        setFilteredTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    let filtered = templates.filter(
      (template: any) =>
        template.name.toLowerCase().includes(query.toLowerCase()) ||
        template.description.toLowerCase().includes(query.toLowerCase()) ||
        template.author.toLowerCase().includes(query.toLowerCase())
    );

    if (filters.filter1) {
      filtered = filtered.filter((template: any) =>
        template.name.includes('Template')
      );
    }

    setFilteredTemplates(filtered);
  }, [searchParams, filters, templates]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <Suspense fallback={<div>Loading templates...</div>}> {/* Zastosowanie Suspense dla całej strony */}
      <div className="h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex bg-gray-900 text-white shadow-lg py-12 px-12">
          <Filters onFilterChange={handleFilterChange}></Filters>
          <div className="w-3/4 pl-4">
            <div className="grid grid-cols-3 gap-6 mt-6">
              {filteredTemplates.map((template: any) => (
                <TemplateCard key={template.id} {...template} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
}
