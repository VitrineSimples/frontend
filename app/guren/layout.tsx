import type { Metadata } from "next";
import { SideBarComponent } from "../components/SideBar/SideBar";

export const metadata: Metadata = {
  title: "Guren - Markets",
  description: "... for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="cntt" className="flex flex-col md:flex-row">
      <SideBarComponent />
      <div className="hidden md:flex w-[60px]" />
      <div className="flex-none md:flex-1">{children}</div>
    </div>
  );
}
