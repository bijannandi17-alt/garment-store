"use client"

import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "../lib/cartContext"

export default function Navbar() {

  const cartContext = useContext(CartContext)

  if (!cartContext) return null

  const { cart } = cartContext

  // total quantity
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (

    <nav className="flex justify-between p-4 bg-pink-600 text-white">

      <h1 className="text-xl font-bold">
        Amropali Fashion
      </h1>

      <div className="space-x-4">

        <Link href="/">
          Home
        </Link>

        <Link href="/products">
          Nighty
        </Link>

        <Link href="/contact">
          Contact
        </Link>

        {/* Cart with count */}

        <Link href="/cart">

          Cart 🛒 ({totalItems})

        </Link>

      </div>

    </nav>

  )

}