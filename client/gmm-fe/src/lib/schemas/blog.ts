export enum BlogStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  status: BlogStatus;
  tags: string[];
  authors: string[];
  content: string;
  thumbnail: string;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}
