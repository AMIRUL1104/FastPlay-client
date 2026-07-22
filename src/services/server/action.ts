const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

import { serverMutation } from "../core/server";
import {
  CreateProductPayload,
  UpdateProductPayload,
} from "@/src/types/product.type";
import { authHeader } from "../core/serverFetch";
import { CreateOrderPayload, Order } from "@/src/types/order.type";
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

export const createOrder = async (data: CreateOrderPayload) => {
  return serverMutation<CreateOrderPayload>("/api/orders", data);
};

export const acceptOrder = async (orderId: string) => {
  return serverMutation(`/api/orders/${orderId}/accept`, {}, "PATCH");
};

export const rejectOrder = async (orderId: string) => {
  return serverMutation(`/api/orders/${orderId}/reject`, {}, "PATCH");
};

export const cancelOrder = async (orderId: string) => {
  return serverMutation(`/api/orders/${orderId}/cancel`, {}, "PATCH");
};

export const completeOrder = async (id: string) => {
  return serverMutation(`/api/orders/${id}/complete`, {}, "PATCH");
};

// -------------------- User Profile --------------------

export const createUserProfile = async () => {
  return serverMutation("/api/users", {});
};

export const updateUserProfile = async (data: UpdateProfilePayload) => {
  return serverMutation<UpdateProfilePayload>("/api/users", data, "PATCH");
};

import { AddToCartPayload, UpdateCartItemPayload } from "@/src/types/cart.type";

// -------------------- Cart --------------------

export const addToCart = async (data: AddToCartPayload) => {
  return serverMutation<AddToCartPayload>("/api/cart", data);
};

export const updateCartItem = async (
  productId: string,
  data: UpdateCartItemPayload,
) => {
  return serverMutation<UpdateCartItemPayload>(
    `/api/cart/${productId}`,
    data,
    "PATCH",
  );
};

export const removeCartItem = async (productId: string) => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(await authHeader()),
    };

    const response = await fetch(`${baseUrl}/api/cart/${productId}`, {
      method: "DELETE",
      headers,
    });

    return await response.json();
  } catch (error) {
    console.error("Remove cart item error:", error);

    return {
      success: false,
      message: "Something went wrong while removing the cart item.",
    };
  }
};

export const clearCart = async () => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(await authHeader()),
    };

    const response = await fetch(`${baseUrl}/api/cart`, {
      method: "DELETE",
      headers,
    });

    return await response.json();
  } catch (error) {
    console.error("Clear cart error:", error);

    return {
      success: false,
      message: "Something went wrong while clearing the cart.",
    };
  }
};
