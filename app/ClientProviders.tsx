"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/Auth/AuthContext";
import { UserProvider } from "@/context/User/UserContext";
import { ShopProvider } from "@/context/Shop/ShopContext";
import { LoadingProvider } from "@/context/Loading/LoadingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "@/context/Product/ProductContext";
import { CartProvider } from "@/context/Cart/CartContext";
import { OrderProvider } from "@/context/Order/OrderContext";
import { SeasonalCampaignProvider } from "@/context/SeasonalCampaign/SeasonalCampaingContext";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <LoadingProvider>
        <AuthProvider>
          <UserProvider>
            <ShopProvider>
              <ProductProvider>
                <CartProvider>
                  <OrderProvider>
                    <SeasonalCampaignProvider>
                      {children}
                    </SeasonalCampaignProvider>
                  </OrderProvider>
                </CartProvider>
              </ProductProvider>
            </ShopProvider>
          </UserProvider>
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}
