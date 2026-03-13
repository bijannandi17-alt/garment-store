"use client"

import { useContext } from "react"
import { CartContext } from "../lib/cartContext"

export default function ProductDetail({ product }: any) {

  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Cart not available</div>
  }

  const { addToCart } = cartContext

  return (

    <div className="p-10 grid grid-cols-2 gap-10">

      <img
        src={product.image}
        className="rounded-xl w-full"
      />

      <div>

        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-pink-600 text-2xl mt-4">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="bg-pink-600 text-white px-6 py-3 mt-6 rounded-lg"
        >
          Add To Cart
        </button>

      </div>

    </div>

  )
}