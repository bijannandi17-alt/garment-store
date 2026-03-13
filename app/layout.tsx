import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../lib/cartContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

<CartProvider>

<Navbar/>

<main>{children}</main>

<Footer/>

</CartProvider>

</body>
    </html>
  )
}