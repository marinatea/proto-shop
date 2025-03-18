'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/header';
import TemplateCard from '@/components/public-page/templateCard';
import Filters from '@/components/public-page/filters';
import { FilterState } from 'types/types';

export default function PublicPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [templates, setTemplates] = useState<any[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<any[]>([]);

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

  const handleFilterChange = (newFilters: FilterState) => {
    const activeFilters = Object.entries(newFilters)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (activeFilters.length === 0) {
      setFilteredTemplates(templates);
      return;
    }

    const filtered = templates.filter((template) =>
      activeFilters.every((filter) => template.categories?.includes(filter))
    );

    setFilteredTemplates(filtered);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex bg-gray-900 text-white shadow-lg py-12 px-12">
        <Filters onFilterChange={handleFilterChange} />
        <div className="w-3/4 pl-4">
          <div className="grid grid-cols-3 gap-6 mt-6">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <TemplateCard key={template.id} {...template} />
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-400">
                No templates found.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
