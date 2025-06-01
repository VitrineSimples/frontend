import type { Metadata } from "next";
import { League_Spartan, Questrial, Roboto } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import { AOSInit } from "./components/AOSInit";
import { AuthProvider } from "@/context/Auth/AuthContext";
import { UserProvider } from "@/context/User/UserContext";
import { ShopProvider } from "@/context/Shop/ShopContext";
import { LoadingProvider } from "@/context/Loading/LoadingContext";

const lspartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guren",
  description: "... for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${lspartan.variable} ${questrial.variable} ${roboto.variable} antialiased font-mono bg-gray-100`}
      >
        <AOSInit />
        <LoadingProvider>
          <AuthProvider>
            <UserProvider>
              <ShopProvider>{children}</ShopProvider>
            </UserProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
