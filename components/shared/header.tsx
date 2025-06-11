'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import User from '../ui/user';
import Menu from '../public-page/menu';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/store';

const Header = () => {
  const { data: session } = useSession();
  const role = session?.user?.role ?? 'user';

  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (sum: number, item: { quantity: number }) => sum + item.quantity,
      0
    )
  );

  return (
    <header className="shadow-lg border-b ">
      <div className=" mx-auto flex items-center justify-start py-4 px-6">
        <Link href="/" className="text-2xl font-bold py-4 px-6">
          ProtoShop
        </Link>

        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <nav className="hidden md:flex items-center space-x-6">
            <Menu />
            <Link href="/enterprise" className="hover:text-gray-400 transition">
              Enterprise
            </Link>
            <Link href="/docs" className="hover:text-gray-400 transition">
              Docs
            </Link>
            <Link href="/pricing" className="hover:text-gray-400 transition">
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-6 ">
          <Link href="/contact" className="hover:text-gray-400 transition">
            Contact
          </Link>
          <Link href="/dashboard" className="hover:text-gray-400 transition">
            Dashboard
          </Link>
          {session?.user && (
            <Link
              href="/user/user/cart"
              className="relative hover:text-gray-400 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          )}

          <div className="relative">
            <User />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
