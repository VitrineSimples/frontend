import { iProduct } from "../Product/type";
import { iUser } from "../User/types";

interface OrderItem {
  id: string;
  productId: string;
  product: iProduct;
  quantity: number;
  orderId: string;
}

interface Order {
  id: string;
  userId: string;
  date: string;
  totalValue: number;
  user: iUser;
  items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  getOrderById: (id: string) => Promise<void>;
  fetchOrders: () => Promise<void>;
  createOrder: (productIds: string[]) => Promise<void>;
  createOrderFromCart: (shopWhatsAppNumber: string) => Promise<void>;
}

export type { OrderItem, Order, OrderContextType };
