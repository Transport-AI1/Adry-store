import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADRY STORE — Encuentra eso que habla de ti",
  description: "Descubre ADRY STORE, una tienda local en Rivas-Vaciamadrid. Una selección especial con personalidad, estilo y detalles que importan.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f1eb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
