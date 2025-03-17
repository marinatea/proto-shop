'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import User from '../ui/user';
import Menu from '../public-page/menu';

const Header = () => {
  return (
    <header className="shadow-lg border-b">
      <div className="container mx-auto flex items-center justify-start py-4 px-6">
        {/* logo */}
        <Link href="/" className="text-2xl font-bold py-4 px-6">
          ProtoShop
        </Link>

        {/* nawigacja */}
        <Menu></Menu>
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <nav className="hidden md:flex items-center space-x-6">
            {/* linki */}
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

        <div className="flex items-center space-x-6">
          <Link href="/contact" className="hover:text-gray-400 transition">
            Contact
          </Link>
          <Link href="/dashboard" className="hover:text-gray-400 transition">
            Dashboard
          </Link>
          {/* logowanie */}
          <div className="relative">
            <User />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
