import { CartItem } from "./cart.type";
import { UserSnapshot } from "./user.type";

export type OrderStatus = "pending" | "accepted" | "rejected" | "cancelled";

export interface OrderUserSnapshot extends UserSnapshot {
  phone: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  phone: string;
}

export interface Order {
  _id: string;

  user: OrderUserSnapshot;

  shippingAddress: ShippingAddress;

  products: CartItem[];

  totalPrice: number;

  paymentMethod: "Cash On Delivery";

  status: OrderStatus;

  createdAt: string;
  updatedAt: string;
}

/**
 * POST /api/orders
 */
export interface CreateOrderPayload {
  shippingAddress: ShippingAddress;
}

/**
 * PATCH /api/orders/:id
 */
export type UpdateOrderPayload = Partial<Pick<Order, "status">>;
