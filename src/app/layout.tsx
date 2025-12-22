import type { Metadata } from "next";

import { Poppins, M_PLUS_1p, Inter, Luckiest_Guy } from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mPlus1p = M_PLUS_1p({
  variable: "--font-m-plus-1p",
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "KanBanFlow",
  description: "Sistema de gestion de tareas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${poppins.variable} ${mPlus1p.variable} ${inter.variable} ${luckiestGuy.variable} antialiased`}
      >
        <Toaster
          richColors={false}
          position="bottom-right"
          toastOptions={{
            // estilos generales del toast, success y error se definen por separado en global.css //
            style: {
              background: 'var(--main-color)',
              color: 'white',
              border: 'none',
            },
            className: 'font-poppins group'
          }}
        />
        {children}
      </body>
    </html>
  );
}
