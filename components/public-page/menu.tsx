// components/Menu.tsx

'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import NavLink from './nav-item';

const Menu = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <nav className="hidden md:flex items-center space-x-6 z-10">
      <div
        className="relative z-50"
        onMouseEnter={() => setOpenMenu(0)}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <button
          className="flex items-center gap-1 text-white hover:text-gray-400 transition "
          onClick={(e) => e.preventDefault()}
        >
          Products
          {openMenu === 0 ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <div
          className="absolute left-0 mt-2 bg-gray-800 shadow-lg rounded-lg w-48"
          style={{
            opacity: openMenu === 0 ? 1 : 0,
            visibility: openMenu === 0 ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease-out, visibility 0.1s ease-out'
          }}
        >
          <NavLink
            name="Previews"
            href="https://vercel.com/products/previews"
          />
          <NavLink name="Ai" href="https://vercel.com/ai" />
          <NavLink name="Fluid Compute" href="https://vercel.com/fluid" />
          <NavLink
            name="Rendering"
            href="https://vercel.com/products/rendering"
          />
          <NavLink
            name="Observability"
            href="https://vercel.com/products/observability"
          />
          <NavLink name="Security" href="https://vercel.com/security" />
          <NavLink name="Next.js" href="https://vercel.com/frameworks/nextjs" />
          <NavLink
            name="Turborepo"
            href="https://vercel.com/solutions/turborepo"
          />
          <NavLink name="AI SDK" href="https://sdk.vercel.ai/" />
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setOpenMenu(1)}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <button
          className="flex items-center gap-1 text-white hover:text-gray-400 transition"
          onClick={(e) => e.preventDefault()}
        >
          Solutions
          {openMenu === 1 ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <div
          className="absolute left-0 mt-2 bg-gray-800 shadow-lg rounded-lg w-48"
          style={{
            opacity: openMenu === 1 ? 1 : 0,
            visibility: openMenu === 1 ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease-out, visibility 0.1s ease-out'
          }}
        >
          <NavLink name="AI Apps" href="https://vercel.com/solutions/ai-apps" />
          <NavLink
            name="Composable Commerce"
            href="https://vercel.com/solutions/composable-commerce"
          />
          <NavLink
            name="Marketing Sites"
            href="https://vercel.com/solutions/marketing-sites"
          />
          <NavLink
            name="Multi-Tenant Platforms "
            href="https://vercel.com/solutions/multi-tenant-saas"
          />
          <NavLink
            name="Web Apps"
            href="https://vercel.com/solutions/web-apps"
          />
          <NavLink
            name="Platform Engineering"
            href="https://vercel.com/solutions/platform-engineering"
          />
          <NavLink
            name="Design Engineers"
            href="https://vercel.com/solutions/design-engineering"
          />
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setOpenMenu(2)}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <button
          className="flex items-center gap-1 text-white hover:text-gray-400 transition"
          onClick={(e) => e.preventDefault()}
        >
          Resources
          {openMenu === 2 ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <div
          className="absolute left-0 mt-2 bg-gray-800 shadow-lg rounded-lg w-48"
          style={{
            opacity: openMenu === 2 ? 1 : 0,
            visibility: openMenu === 2 ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease-out, visibility 0.1s ease-out'
          }}
        >
          <NavLink name="Resource Center" href="https://vercel.com/resources" />
          <NavLink name="Marketplace" href="https://vercel.com/marketplace" />
          <NavLink name="Templates" href="https://vercel.com/templates" />
          <NavLink name="Guides" href="https://vercel.com/guides" />
          <NavLink
            name="Partner Finder"
            href="https://vercel.com/partners/solution-partners"
          />
          <NavLink name="Customers" href="https://vercel.com/customers" />
          <NavLink name="Blog" href="https://vercel.com/blog" />
          <NavLink name="Changelog" href="https://vercel.com/changelog" />
          <NavLink name="Press" href="https://vercel.com/press" />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
