interface OrderItem {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: string;
  total: number;
  items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  createOrder: (productIds: string[]) => Promise<void>;
  createOrderFromCart: () => Promise<void>;
}

export type { OrderItem, Order, OrderContextType };