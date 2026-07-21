export interface DashboardResponse<T> {
  success: boolean;
  data: T;
}

export interface AdminDashboardStats {
  totalProducts: number;
  totalOrders: number;

  pendingOrders: number;
  acceptedOrders: number;
  rejectedOrders: number;
  cancelledOrders: number;

  totalUsers: number;
}

export interface UserDashboardStats {
  totalOrders: number;

  pendingOrders: number;
  acceptedOrders: number;
  rejectedOrders: number;
  cancelledOrders: number;
}
