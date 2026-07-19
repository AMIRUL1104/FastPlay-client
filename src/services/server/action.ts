const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

import { serverMutation } from "../core/server";
import {
  CreateProductPayload,
  UpdateProductPayload,
} from "@/src/types/product.type";
import { authHeader } from "../core/serverFetch";
import { Order } from "@/src/types/order.type";
import { UpdateProfilePayload } from "@/src/types/user.type";

// -------------------- Product --------------------

export const createProduct = async (data: CreateProductPayload) => {
  return serverMutation<CreateProductPayload>("/api/products", data);
};

export const updateProduct = async (
  productId: string,
  data: UpdateProductPayload,
) => {
  return serverMutation<UpdateProductPayload>(
    `/api/products/${productId}`,
    data,
    "PATCH",
  );
};

export const deleteProduct = async (productId: string) => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(await authHeader()),
    };

    const response = await fetch(`${baseUrl}/api/products/${productId}`, {
      method: "DELETE",
      headers,
    });

    return await response.json();
  } catch (error) {
    console.error("Delete product error:", error);

    return {
      success: false,
      message: "Something went wrong while deleting the product.",
    };
  }
};

// -------------------- Orders --------------------

export const createOrder = async (data: Order) => {
  return serverMutation<Order>("/api/orders", data);
};

export const acceptOrder = async (orderId: string) => {
  return serverMutation(`/api/orders/${orderId}/accept`, {}, "PATCH");
};

export const rejectOrder = async (orderId: string) => {
  return serverMutation(`/api/orders/${orderId}/reject`, {}, "PATCH");
};

// -------------------- User Profile --------------------

export const createUserProfile = async () => {
  return serverMutation("/api/users", {});
};

export const updateUserProfile = async (data: UpdateProfilePayload) => {
  return serverMutation<UpdateProfilePayload>("/api/users", data, "PATCH");
};
