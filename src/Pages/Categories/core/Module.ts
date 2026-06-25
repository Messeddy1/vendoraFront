// Types for the Categories feature
// Mirrors the CategoryResource shape returned by the Laravel API

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

// Payload shape when creating a new category
export interface CreateCategoryPayload {
  name: string;
  description?: string;
  image?: string;
}

// Payload shape when updating an existing category
export interface UpdateCategoryPayload {
  id: number;
  name?: string;
  description?: string;
  image?: string;
}
