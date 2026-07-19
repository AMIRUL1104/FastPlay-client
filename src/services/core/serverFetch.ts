"use server";
import { getUserToken } from "./session";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authHeader = async (): Promise<HeadersInit> => {
  const token = await getUserToken();

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

export async function serverFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();

      throw new Error(`Server returned ${res.status}: ${errorText}`);
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function protectedFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();

      throw new Error(`Server returned ${res.status}: ${errorText}`);
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
