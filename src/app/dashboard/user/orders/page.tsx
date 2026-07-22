import { getMyOrders } from "@/src/services/server/api";
import OrderTableList from "./OrderTableList";
// import { Order } from "@/src/types/order.type";


export default async function MyOrderPage() {
    const orders = await getMyOrders() || [];
    //   const orders: Order[] = (await getMyOrders()) || [];

    return (
        <div className="w-full max-w-full overflow-hidden space-y-6 p-3 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-text-head font-display">
                    My Orders
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-text-muted">
                    View your order history, tracking details, and status updates.
                </p>
            </div>

            {/* Orders Table Client Component */}
            <OrderTableList orders={orders} />
        </div>
    );
}