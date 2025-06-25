'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Template } from 'types/types';
import { getProducts } from '@/lib/woocommerce';

import { SearchInput } from '@/components/user/search';
import TemplateCard from '@/components/public-page/templateCard';
import NewProductModal from '@/components/user/newProductModal';
import Nav from '@/components/user/Nav';

export default function UserPanel() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Template[]>([]);
  const [userProducts, setUserProducts] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && session?.user?.name) {
      const filtered = products
        .filter((p) => p.author === session.user.name)
        .map((p) => ({
          ...p,
          availableAt: '',
          status: 'active'
        }));
      setUserProducts(filtered);
    }
  }, [loading, session, products]);

  const handleAddProduct = (product: Partial<Template>) => {
    if (session?.user?.name) {
      const newProduct: Template = {
        id: Math.floor(Date.now() * Math.random()),
        name: product.name || '',
        description: product.description || '',
        author: session.user.name,
        image: product.image || '',
        demoLink: product.demoLink || '',
        framework: product.framework || '',
        css: product.css || '',
        database: product.database || '',
        cms: product.cms || '',
        authentication: product.authentication || '',
        analytics: product.analytics || '',
        useCase: product.useCase || '',
        price: product.price || '',
        availableAt: ''
      };
      setUserProducts((prev) => [...prev, newProduct]);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex">
      <Nav />
      <div className="flex-1 p-8">
        <header className="sticky top-0 z-30 flex items-center gap-16 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="ml-auto flex items-center gap-4">
            <SearchInput />
          </div>
        </header>

        <h1 className="text-2xl font-bold m-6">
          Welcome to your dashboard, {session?.user?.name || 'User'}!
        </h1>

        <div className="flex items-center justify-between mb-6 px-6">
          <h2 className="text-xl font-semibold">Your Products</h2>
          <NewProductModal addProductAction={handleAddProduct} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProducts.map((product) => (
            <TemplateCard key={product.id} {...product} availableAt={''} />
          ))}
        </div>
      </div>
    </div>
  );
}
