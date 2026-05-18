import "./globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { CartProvider } from "../lib/cartContext"

import Script from "next/script"

export const metadata = {
  title: "Amropali Fashion",
  description:
    "Shop stylish nighties and daily wear at Amropali Fashion. Affordable fashion with fast delivery.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">

      <body>

        <CartProvider>

          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />

        </CartProvider>

        {/* ✅ Razorpay Script */}

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

      </body>

    </html>

  )
}