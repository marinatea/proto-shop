export interface User {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
}

export interface NavLinkProps {
  name: string;
  href: string;
}

export type FilterState = {
  [key: string]: boolean;
};

export type Template = {
  id: number;
  name: string;
  description: string;
  author: string;
  demoLink: string;
  framework: string;
  css: string;
  database: string;
  cms: string;
  authentication: string;
  analytics: string;
  useCase: string;
  price: string;
  availableAt: string;
  image: string | File;
};

export interface FilterItem {
  name: string;
  subfilters: string[];
}
