"use server";

import { authHeader } from "./serverFetch";

const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

interface ServerMutationResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
  insertedId?: string;
  createdAt?: string;
  error?: string;
}

export const serverMutation = async <TData>(
  path: string,
  data: TData,
  method: "POST" | "PATCH" = "POST",
): Promise<ServerMutationResponse> => {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Something went wrong!",
    };
  }
};
