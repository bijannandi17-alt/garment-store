"use client"

import { useContext, use } from "react"
import { CartContext } from "../../../lib/cartContext"
import { products } from "../../../data/products"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params)   // unwrap params here

  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Cart not available</div>
  }

  const { addToCart } = cartContext

  const productId = Number(id)

  const product = products.find(p => p.id === productId)

  if (!product) {
    return <div className="p-10">Product not found</div>
  }

  return (

    <div className="p-10 grid grid-cols-2 gap-10">

      <img src={product.image} className="rounded-xl w-full" />

      <div>

        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-pink-600 text-2xl mt-4">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="bg-pink-600 text-white px-6 py-3 mt-6 rounded"
        >
          Add To Cart
        </button>

      </div>

    </div>

  )
}