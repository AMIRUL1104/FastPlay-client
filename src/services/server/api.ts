

import { protectedFetch, serverFetch } from "../core/serverFetch";
import { Order } from "@/src/types/order.type";
import { Cart } from "@/src/types/cart.type";
import { UserProfile } from "@/src/types/user.type";
import { ApiResponse, PaginatedResponse, Product } from "@/src/types/product.type";

export interface GetProductsParams {
  search?: string;
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

// ---------------- Products ----------------

export const getProducts = async ({
  search = "",
  category = "",
  sort = "newest",
  minPrice,
  maxPrice,
  page = 1,
  limit = 8,
}: GetProductsParams = {}): Promise<PaginatedResponse<Product>> => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);

  if (minPrice !== undefined)
    params.set("minPrice", String(minPrice));

  if (maxPrice !== undefined)
    params.set("maxPrice", String(maxPrice));

  params.set("page", String(page));
  params.set("limit", String(limit));

  const result = await serverFetch<PaginatedResponse<Product>>(
    `/api/products?${params.toString()}`,
  );

  return (
    result ?? {
      success: false,
      data: [],
      total: 0,
      totalPages: 1,
      currentPage: page,
    }
  );
};

export const getFeaturedProducts = async () => {
  return serverFetch<{ success: boolean; data: Product[] }>("/api/products/featured");
};

export const getProductById = async (id: string) => {
  return serverFetch<ApiResponse<Product>>(`/api/products/${id}`);
};

// ---------------- Cart ----------------

export const getCart = async () => {
  return protectedFetch<Cart>("/api/cart");
};

// ---------------- Orders ----------------

export const getMyOrders = async () => {
  return protectedFetch<Order[]>("/api/orders/my");
};

// ---------------- Dashboard ----------------

export const getUserDashboard = async () => {
  return protectedFetch("/api/dashboard/user");
};

export const getAdminDashboard = async () => {
  return protectedFetch("/api/dashboard/admin");
};

// ---------------- Admin ----------------

export const getAllProductsForAdmin = async () => {
  return protectedFetch<Product[]>("/api/products/admin");
};

// ---------------- User ----------------

export const getUserProfile = async (): Promise<UserProfile | null> => {
  return protectedFetch<UserProfile>("/api/users");
}