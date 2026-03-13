"use client"

import { useContext } from "react"
import { CartContext } from "../../lib/cartContext"

export default function CartPage() {

  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Cart not available</div>
  }

  const { cart } = cartContext

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cart.map((item, i) => (

        <div key={i} className="border p-4 mb-3">

          <h2>{item.name}</h2>

          <p>₹{item.price}</p>

        </div>

      ))}

    </div>

  )
}