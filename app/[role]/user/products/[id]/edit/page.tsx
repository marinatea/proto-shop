'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Template } from 'types/types';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) return;

    const fetchTemplate = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!template) return;

    if (!template.name || !template.price || !template.author) {
      alert('Name, price, and author are required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', template.name);
    formData.append('description', template.description || '');
    formData.append('price', template.price);
    formData.append('author', template.author);

    if (template.image) {
      formData.append('image', template.image);
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        router.push(`/user/products/${id}`);
      } else {
        const errorText = await response.text();
        console.error('Error updating product:', errorText);
        alert(`Error updating product: ${errorText}`);
      }
    } catch (error) {
      console.error('Error during product update request:', error);
      alert('Error updating product');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setTemplate((prevTemplate) => ({
          ...prevTemplate!,
          image: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!template || !session?.user) {
    return <div className="text-center text-red-500">Access Denied</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Edit Product:
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-600 font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={template.name}
            onChange={(e) => setTemplate({ ...template, name: e.target.value })}
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-gray-600 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={template.description}
            onChange={(e) =>
              setTemplate({ ...template, description: e.target.value })
            }
            className="mt-2 text-black p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="text-gray-600 font-medium">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            type="text"
            value={template.price}
            onChange={(e) =>
              setTemplate({ ...template, price: e.target.value })
            }
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="author" className="text-gray-600 font-medium">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            id="author"
            type="text"
            value={template.author}
            onChange={(e) =>
              setTemplate({ ...template, author: e.target.value })
            }
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Add new fields */}
        <div className="flex flex-col">
          <label htmlFor="demoLink" className="text-gray-600 font-medium">
            DemoLink
          </label>
          <input
            id="demoLink"
            type="text"
            value={template.demoLink || ''}
            onChange={(e) =>
              setTemplate({ ...template, demoLink: e.target.value })
            }
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="framework" className="text-gray-600 font-medium">
            Framework
          </label>
          <input
            id="framework"
            type="text"
            value={template.framework || ''}
            onChange={(e) =>
              setTemplate({ ...template, framework: e.target.value })
            }
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="css" className="text-gray-600 font-medium">
            CSS
          </label>
          <input
            id="css"
            type="text"
            value={template.css || ''}
            onChange={(e) => setTemplate({ ...template, css: e.target.value })}
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="database" className="text-gray-600 font-medium">
            Database
          </label>
          <input
            id="database"
            type="text"
            value={template.database || ''}
            onChange={(e) =>
              setTemplate({ ...template, database: e.target.value })
            }
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="cms" className="text-gray-600 font-medium">
            CMS
          </label>
          <input
            id="cms"
            type="text"
            value={template.cms || ''}
            onChange={(e) => setTemplate({ ...template, cms: e.target.value })}
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="authentication" className="text-gray-600 font-medium">
            Authentication
          </label>
          <input
            id="authentication"
            type="text"
            value={template.authentication || ''}
            onChange={(e) =>
              setTemplate({ ...template, authentication: e.target.value })
            }
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="analytics" className="text-gray-600 font-medium">
            Analytics
          </label>
          <input
            id="analytics"
            type="text"
            value={template.analytics || ''}
            onChange={(e) =>
              setTemplate({ ...template, analytics: e.target.value })
            }
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="useCase" className="text-gray-600 font-medium">
            UseCase
          </label>
          <input
            id="useCase"
            type="text"
            value={template.useCase || ''}
            onChange={(e) =>
              setTemplate({ ...template, useCase: e.target.value })
            }
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-gray-600 font-medium">
            Image
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="mt-2 p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Image preview"
                className="max-w-xs rounded-lg"
              />
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gray-800 text-white hover:bg-gray-700 py-3 rounded-lg"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
