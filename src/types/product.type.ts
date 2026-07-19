export type ProductCategory =
  | "football"
  | "cricket"
  | "badminton"
  | "gym-equipment";

export interface Product {
  _id: string;

  name: string;
  slug: string;

  category: ProductCategory;
  brand: string;

  price: number;
  stock: number;

  description: string;

  image: string;

  featured: boolean;

  createdAt: string;
  updatedAt: string;
}

/**
 * GET Single Product
 * GET All Products
 */
export type ProductResponse = Product;

/**
 * POST Product
 */
export type CreateProductPayload = Omit<
  Product,
  "_id" | "createdAt" | "updatedAt"
>;

/**
 * PATCH Product
 */
export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// // GET /products
// PaginatedResponse<Product>

// // GET /products/:id
// ApiResponse<Product>

// // POST /products
// CreateProductPayload

// // PATCH /products/:id
// UpdateProductPayload
