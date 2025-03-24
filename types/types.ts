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
  analytics: any;
  authentication: any;
  cms: any;
  database: any;
  css: any;
  framework: any;
  useCase: any;
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
