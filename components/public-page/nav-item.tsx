// components/NavLink.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { NavLinkProps } from '../../types/types';

const NavLink: React.FC<NavLinkProps> = ({ name, href }) => {
  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition"
      >
        {name}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition"
    >
      {name}
    </Link>
  );
};

export default NavLink;
