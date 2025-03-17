'use client';

import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { SearchInput } from '../../../components/user/search';
import { User } from '@/components/ui/user';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Home,
  ShoppingCart,
  Package,
  LineChart,
  PanelLeft
} from 'lucide-react';
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

export default function UserDashboard() {
  const { data: session } = useSession();
  const params = useParams();

  return (
    <div className="min-h-screen flex">
      {/* Boczne menu */}
      <DesktopNav />

      {/* Główna zawartość */}
      <div className="flex-1 p-8">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNav />
          <DashboardBreadcrumb />
          <SearchInput />
          <User />
        </header>

        <h1 className="text-2xl font-bold mb-6">
          Welcome to your dashboard, {session?.user?.name || 'User'}!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
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

        <NavItem href="/user/profile" label="Profile">
          <Package className="h-5 w-5" />
        </NavItem>

        <NavItem href="/user/analytics" label="Analytics">
          <LineChart className="h-5 w-5" />
        </NavItem>
      </nav>

      {/* Ustawienia */}
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
            href="/user/profile"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Package className="h-5 w-5" />
            Profile
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
          <BreadcrumbPage>All Orders</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
