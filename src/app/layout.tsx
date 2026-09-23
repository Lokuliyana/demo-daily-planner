import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductQuickView } from "@/components/ProductQuickView";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Little Lines — Handcrafted Stationery & Custom Planners",
  description:
    "Design and order customizable 3–12 month A/L study planners, year planners, daily logs, sticky notes, and stationery. Handcrafted in Sri Lanka with 120gsm bleed-proof paper.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#F9F7F2] text-[#24211E] font-sans selection:bg-[#C26D4A] selection:text-white transition-colors duration-300">
        <StoreProvider>
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
          <ProductQuickView />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}

