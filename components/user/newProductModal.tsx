'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogOverlay
} from '@radix-ui/react-dialog';

interface NewProductModalProps {
  addProductAction: (product: {
    name: string;
    description?: string;
    author: string;
    image?: string;
    demoLink?: string;
    framework?: string;
    css?: string;
    database?: string;
    cms?: string;
    authentication?: string;
    analytics?: string;
    useCase?: string;
    price: string;
  }) => void;
}

export default function NewProductModal({
  addProductAction
}: NewProductModalProps) {
  console.log('NewProductModal rendered');
  const { data: session } = useSession();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState(session?.user?.name || '');
  const [image, setImage] = useState<string | null>(null);
  const [demoLink, setDemoLink] = useState('');
  const [framework, setFramework] = useState('');
  const [css, setCss] = useState('');
  const [database, setDatabase] = useState('');
  const [cms, setCms] = useState('');
  const [authentication, setAuthentication] = useState('');
  const [analytics, setAnalytics] = useState('');
  const [useCase, setUseCase] = useState('');
  const [price, setPrice] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProductAction({
      name,
      description,
      author,
      image: image || '',
      demoLink,
      framework,
      css,
      database,
      cms,
      authentication,
      analytics,
      useCase,
      price
    });
    console.log('Submitted product:', {
      name,
      description,
      author,
      image: image || '',
      demoLink,
      framework,
      css,
      database,
      cms,
      authentication,
      analytics,
      useCase,
      price
    });
    setName('');
    setDescription('');
    setAuthor(session?.user?.name || '');
    setImage('');
    setDemoLink('');
    setFramework('');
    setCss('');
    setDatabase('');
    setCms('');
    setAuthentication('');
    setAnalytics('');
    setUseCase('');
    setPrice('');
    setOpen(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^[0-9.,]*$/.test(value)) {
      setPrice(value);
      setError('');
    } else {
      setError('Please enter a valid number');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-700 text-white hover:bg-slate-950/90 text-2xl md:text-xl py-8 px-8">
          + Add New Product
        </Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 z-50 bg-gray-800/80 backdrop-blur-sm" />

      <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] p-8 bg-gray-950/70 shadow-lg rounded-lg overflow-auto max-h-[90vh]">
        <DialogTitle className="font-semibold mb-4 text-4xl">
          Add New Product
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 ">
            <Input
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-200 text-xl"
            />
            <Input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="bg-gray-200 text-black text-xl"
            />
            <Input
              placeholder="Price"
              value={price}
              onChange={handlePriceChange}
              required
              className="bg-gray-200 text-xl"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-200 text-xl"
            />
            <Input
              placeholder="Image URL (optional)"
              onChange={(e) => setImage(e.target.value)}
              className="hidden"
            />
            <Input
              placeholder="Demo Link (optional)"
              value={demoLink}
              onChange={(e) => setDemoLink(e.target.value)}
              className="bg-gray-200 text-xl"
            />
            <Input
              placeholder="Framework (optional)"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="bg-gray-200 text-xl"
            />
            <Input
              placeholder="CSS (optional)"
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="bg-gray-200 text-xl"
            />
            <Input
              placeholder="Database (optional)"
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              className="bg-gray-200 text-xl"
            />
            <Input
              placeholder="CMS (optional)"
              value={cms}
              onChange={(e) => setCms(e.target.value)}
              className="bg-gray-200 text-xl"
            />
            <Input
              placeholder="Authentication (optional)"
              value={authentication}
              onChange={(e) => setAuthentication(e.target.value)}
              className="bg-gray-200 text-xl"
            />
            <Input
              placeholder="Analytics (optional)"
              value={analytics}
              onChange={(e) => setAnalytics(e.target.value)}
              className="bg-gray-200 text-xl"
            />
            <Input
              placeholder="Use Case (optional)"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="bg-gray-200 text-xl"
            />

            <label className="block mt-2 w-full text-xl border border-solid border-gray-500 text-center py-3 rounded cursor-pointer hover:bg-gray-800 transition">
              {image || 'Click to select file'}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setImage(imageUrl);
                  }
                }}
                className="hidden"
              />
            </label>

            <div className="mt-6 flex justify-end space-x-6">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xl bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="text-xl bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Add Product
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
