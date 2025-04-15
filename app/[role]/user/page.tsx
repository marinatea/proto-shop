'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Template } from 'types/types';
import { SearchInput } from '../../../components/user/search';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, ShoppingCart, LineChart, PanelLeft } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { NavItem } from '../../../components/admin/nav-item';
import Link from 'next/link';
import { Settings } from '../../../components/ui/settings';
import TemplateCard from '@/components/public-page/templateCard';
import { products } from 'app/api/products/templatesData';
import NewProductModal from '@/components/user/newProductModal';

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
      <DesktopNav />

      <div className="flex-1 p-8 justify-between">
        <header className="sticky top-0 z-30 flex items-center gap-16 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNav />
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

function DesktopNav() {
  return (
    <aside className="sticky inset-y-0 left-0 z-10 bg-background border-r hidden sm:flex flex-col">
      <nav className="flex flex-col items-start gap-4 px-6 py-5">
        <NavItem href="/user/user" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>
        <NavItem href="/user/orders" label="Orders">
          <ShoppingCart className="h-5 w-5" />
        </NavItem>
        <NavItem href="/user/analytics" label="Analytics">
          <LineChart className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-6 py-5">
        <Link
          href="/user/settings"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/user/user"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/user/orders"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/user/analytics"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Analytics
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
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
