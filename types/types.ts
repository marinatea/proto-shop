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
  analytics: string;
  authentication: string;
  cms: string;
  database: string;
  css: string;
  framework: string;
  useCase: string;
  id: number;
  name: string;
  description: string;
  image: string;
  author: string;
  demoLink: string;
  categories: string;
};

export interface FilterItem {
  name: string;
  subfilters: string[];
}
