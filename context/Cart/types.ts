interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  shopId: string;
  shopWhatsApp: string;
  quantity: number;
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

interface AddCartItem {
  productId: string;
  quantity: number;
}

interface iCartContext {
  cart: Cart | null;
  getCart: () => Promise<void>;
  addToCart: (item: AddCartItem, currentShopId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => void
}

export type { CartItem, Cart, AddCartItem, iCartContext };
