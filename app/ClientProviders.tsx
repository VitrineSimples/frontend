"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/Auth/AuthContext";
import { UserProvider } from "@/context/User/UserContext";
import { ShopProvider } from "@/context/Shop/ShopContext";
import { LoadingProvider } from "@/context/Loading/LoadingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer />
      <LoadingProvider>
        <AuthProvider>
          <UserProvider>
            <ShopProvider>{children}</ShopProvider>
          </UserProvider>
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}
