import { GetPostsParams } from "@/interface/post related/getPostsParams";
import { protectedFetch, serverFetch } from "../core/serverFetch";
import { PostResponse } from "@/interface/post related/postResponse";
import {
  BooksResponse,
  FeaturedPostsResponse,
} from "@/interface/post related/booksResponse";
import { CheckBookRequestResponse } from "@/interface/bookRequest/checkRequest";
import { BookRequestResponse } from "@/interface/bookRequest/bookRequest";
import { UserProfile } from "@/interface/user/userProfile";
import { UserDashboardResponse } from "@/interface/dashboard/dashboard";

export const getPosts = async <T>({
  search = "",
  category = "",
  condition = "",
  listingType = "",
  sort = "newest",
  page = 1,
  limit = 6,
}: GetPostsParams = {}): Promise<BooksResponse<T>> => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (condition) params.set("condition", condition);
  if (listingType) params.set("listingType", listingType);
  if (sort) params.set("sort", sort);

  params.set("page", String(page));
  params.set("limit", String(limit));

  const result = await serverFetch<BooksResponse<T>>(
    `/api/posts?${params.toString()}`,
  );

  // serverFetch returns null on failure
  if (!result) {
    return {
      success: false,
      books: [],
      total: 0,
      totalPages: 1,
      currentPage: page,
    };
  }

  return result;
};

export const getUserDashboard =
  async (): Promise<UserDashboardResponse | null> => {
    return protectedFetch<UserDashboardResponse>("/api/dashboard/user");
  };

export const getPostById = async (id: string): Promise<PostResponse | null> => {
  return serverFetch<PostResponse>(`/api/posts/${id}`);
};

export const getMyPosts = async <T>(): Promise<BooksResponse<T> | null> => {
  const result = await protectedFetch<BooksResponse<T>>(`/api/posts/my`);
  return result;
};

export const checkBookRequest = async (
  postId: string,
  sellerId: string,
  requesterId: string,
): Promise<CheckBookRequestResponse | null> => {
  const result = await serverFetch<CheckBookRequestResponse>(
    `/api/book-requests/check?postId=${postId}&sellerId=${sellerId}&requesterId=${requesterId}`,
  );
  return result;
};

export const getSentRequests = async (
  userId: string,
): Promise<BookRequestResponse | null> => {
  const result = await protectedFetch<BookRequestResponse>(
    `/api/book-requests/sent?requesterId=${userId}`,
  );
  return result;
};
export const getReceivedRequests = async (
  userId: string,
): Promise<BookRequestResponse | null> => {
  const result = await protectedFetch<BookRequestResponse>(
    `/api/book-requests/received?sellerId=${userId}`,
  );
  return result;
};

// getFeaturedPosts
export const getFeaturedPosts = async <
  T,
>(): Promise<FeaturedPostsResponse<T> | null> => {
  return await serverFetch<FeaturedPostsResponse<T>>("/api/posts/featured");
};
// userProfile actions

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const result = await protectedFetch<UserProfile>("/api/users");
  return result;
};
