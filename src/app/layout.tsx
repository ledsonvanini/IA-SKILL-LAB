import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FontControlProvider } from "@/contexts/FontControlContext";
import { CartProvider } from "@/contexts/CartContext";
import { CartSidebar } from "@/components/shared/CartSidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "META21 Supermercados",
    template: "%s | META21",
  },
  description:
    "Ofertas exclusivas, produtos frescos e o melhor preço da região. META21 — qualidade na sua mesa todos os dias.",
  keywords: ["supermercado", "ofertas", "promoções", "META21", "compras online"],
  authors: [{ name: "Ledson Vanini" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "META21 Supermercados",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f6" },
    { media: "(prefers-color-scheme: dark)", color: "#201212" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <FontControlProvider>
            <CartProvider>
              {children}
              <CartSidebar />
            </CartProvider>
          </FontControlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
