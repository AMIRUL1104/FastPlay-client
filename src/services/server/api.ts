import { protectedFetch, serverFetch } from "../core/serverFetch";
import { Order } from "@/src/types/order.type";
import { Cart } from "@/src/types/cart.type";
import { UserProfile, UserProfiledetails } from "@/src/types/user.type";
import {
  ApiResponse,
  PaginatedResponse,
  Product,
} from "@/src/types/product.type";

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

  if (minPrice !== undefined) params.set("minPrice", String(minPrice));

  if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));

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
  return serverFetch<{ success: boolean; data: Product[] }>(
    "/api/products/featured",
  );
};

export const getProductById = async (id: string) => {
  return serverFetch<ApiResponse<Product>>(`/api/products/${id}`);
};

// ---------------- Cart ----------------

export const getCart = async (): Promise<Cart | null> => {
  try {
    const response = await protectedFetch<ApiResponse<Cart>>("/api/cart");

    if (response?.success && response?.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return null;
  }
};

// ---------------- Orders ----------------

export const getMyOrders = async () => {
  // return protectedFetch<Order[]>("/api/orders");
  const result = await protectedFetch<ApiResponse<Order[]>>("/api/orders");
  return result?.data ?? null;
};

export const getAllOrders = async (): Promise<Order[] | null> => {
  const result =
    await protectedFetch<ApiResponse<Order[]>>("/api/orders/admin");

  return result?.data ?? null;
};
export const getOrderById = async (orderId: string) => {
  return protectedFetch<Order>(`/api/orders/${orderId}`);
};

// ---------------- Dashboard ----------------
import type {
  AdminDashboardStats,
  DashboardResponse,
  UserDashboardStats,
} from "@/src/types/dashboard.type";
import { ChatMessage } from "@/src/types/ai.type";

export const getAdminDashboard =
  async (): Promise<AdminDashboardStats | null> => {
    const result = await protectedFetch<DashboardResponse<AdminDashboardStats>>(
      "/api/dashboard/admin",
    );
    // console.log(result);
    return result?.data ?? null;
  };

export const getUserDashboard =
  async (): Promise<UserDashboardStats | null> => {
    const result = await protectedFetch<DashboardResponse<UserDashboardStats>>(
      "/api/dashboard/user",
    );

    return result?.data ?? null;
  };
// ---------------- Admin ----------------

export const getAllProductsForAdmin = async (): Promise<Product[] | null> => {
  const result = await protectedFetch<ApiResponse<Product[]>>(
    "/api/products/admin",
  );
  // console.log(result);

  return result?.data ?? null;
};

export const getAllUsers = async (): Promise<UserProfiledetails[] | null> => {
  const result =
    await protectedFetch<ApiResponse<UserProfiledetails[]>>("/api/users/admin");

  return result?.data ?? null;
};
// ---------------- User ----------------

export const getUserProfile = async (): Promise<UserProfiledetails | null> => {
  try {
    const response =
      await protectedFetch<ApiResponse<UserProfiledetails>>("/api/users");

    // রেসপন্স সফল হলে এবং ডাটা থাকলে শুধু UserProfiledetails অবজেক্টটি রিটার্ন করবে
    if (response?.success && response?.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

// ---------------- AI ----------------
export const getConversation = async (): Promise<ChatMessage[] | null> => {
  const result = await protectedFetch<ApiResponse<ChatMessage[]>>(
    "/api/ai/conversation",
  );

  return result?.data ?? null;
};
