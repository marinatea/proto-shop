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
  acf: TemplateExtraData;
  price: string;
  availableAt: string;
  images: ImageData[];
};

export interface FilterItem {
  name: string;
  subfilters: string[];
}

export interface ImageData {
  src: string;
  name: string;
  alt: string;
}

export interface TemplateExtraData {
  author: string;
  demo_link: string;
  framework: string;
  css: string;
  database: string;
  cms: string;
  authentication: string;
  analytics: string;
  use_case: string;
}
