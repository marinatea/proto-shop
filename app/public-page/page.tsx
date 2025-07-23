'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import TemplateCard from '@/components/public-page/templateCard';
import Filters from '@/components/public-page/filters';
import { FilterState, Template } from 'types/types';
import Spinner from '@/components/shared/spinner';
import Nav from '@/components/user/Nav';

export default function PublicPage() {
  const { data: session, status } = useSession();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data: Template[] = await response.json();
        setTemplates(data);
        setFilteredTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setIsLoading(false);
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

    const filtered = templates.filter((template) => {
      return activeFilters.some((filter) => {
        return (
          template.useCase?.toLowerCase().includes(filter.toLowerCase()) ||
          template.framework?.toLowerCase().includes(filter.toLowerCase()) ||
          template.css?.toLowerCase().includes(filter.toLowerCase()) ||
          template.database?.toLowerCase().includes(filter.toLowerCase()) ||
          template.cms?.toLowerCase().includes(filter.toLowerCase()) ||
          template.authentication
            ?.toLowerCase()
            .includes(filter.toLowerCase()) ||
          template.analytics?.toLowerCase().includes(filter.toLowerCase())
        );
      });
    });

    setFilteredTemplates(filtered);
  };

  if (status === 'loading' || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex">
      {session && <Nav />}
      <main className="flex-grow bg-gray-900 text-white shadow-lg py-8 px-8 flex flex-row">
        <Filters onFilterChange={handleFilterChange} />
        <div className="w-full pl-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
