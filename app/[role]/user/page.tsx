'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Template } from 'types/types';
import { SearchInput } from '../../../components/user/search';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import TemplateCard from '@/components/public-page/templateCard';
import { products } from 'app/api/products/templatesData';
import NewProductModal from '@/components/user/newProductModal';
import Nav from '@/components/user/Nav';

export default function UserDashboard() {
  const { data: session } = useSession();
  const [prod, setProd] = useState<Template[]>([]);

  useEffect(() => {
    if (session?.user?.name) {
      const userProducts = products
        .filter((product) => product.author === session.user.name)
        .map((product) => ({
          ...product,
          availableAt: '',
          status: 'active'
        }));
      setProd(userProducts);
    }
  }, [session]);

  const handleAddProduct = (product: {
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
  }) => {
    if (session?.user?.name) {
      const newProduct: Template = {
        id: Math.floor(Date.now() * Math.random()),
        name: product.name,
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
        price: product.price,
        availableAt: ''
      };
      setProd((prev) => [...prev, newProduct]);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Nav />
      <div className="flex-1 p-8 justify-between">
        <header className="sticky top-0 z-30 flex items-center gap-16 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <DashboardBreadcrumb />
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
          {prod.map((product) => (
            <TemplateCard key={product.id} {...product} availableAt={''} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/user/user">User Panel</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/user/orders">Orders</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Your Products</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
