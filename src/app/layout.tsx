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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Quicksand:wght@500;600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Playfair+Display:ital,wght@0,600;1,600&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFFDF9] text-[#382A2C] font-sans selection:bg-[#FF6B8B] selection:text-white transition-colors duration-300">
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

