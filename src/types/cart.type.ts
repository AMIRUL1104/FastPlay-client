import { ProductCategory } from "./product.type";
import { UserSnapshot } from "./user.type";

export interface CartItem {
  productId: string;

  name: string;
  brand: string;
  category: ProductCategory;

  image: string;

  price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  _id: string;

  user: UserSnapshot;

  items: CartItem[];

  totalItems: number;
  totalPrice: number;

  updatedAt: string;
}

/**
 * POST /api/cart
 */
export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

/**
 * PATCH /api/cart/:productId
 */
export interface UpdateCartItemPayload {
  quantity: number;
}
