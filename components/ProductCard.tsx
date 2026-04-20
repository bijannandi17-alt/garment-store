"use client"

import { useState, useContext } from "react"
import Link from "next/link"
import { CartContext } from "../lib/cartContext"
import { Product } from "@/types/product"

type Props = {
  _id: string
  name: string
  price: number
  oldPrice?: number
  image: string
  hoverImage?: string
}

export default function ProductCard({
  _id,
  name,
  price,
  oldPrice,
  image,
  hoverImage
}: Props) {

  const [hover, setHover] = useState(false)

  const cartContext =
    useContext(CartContext)

  if (!cartContext) return null

  const { addToCart } =
    cartContext

  const discount =
    oldPrice
      ? Math.round(
          ((oldPrice - price) /
            oldPrice) * 100
        )
      : 0

  return (

    <div
      className="border rounded-xl shadow p-4 relative hover:shadow-xl transition"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      {/* Discount Badge */}

      {discount > 0 && (

        <div className="absolute left-3 top-3 bg-green-500 text-white px-2 py-1 text-sm rounded">

          {discount}% OFF

        </div>

      )}

      {/* Wishlist */}

      <div className="absolute right-3 top-3 text-red-500 text-xl">

        ♡

      </div>

      {/* Image */}

      <Link href={`/product/${_id}`}>

        <img
          src={
            hover && hoverImage
              ? hoverImage
              : image
          }
          alt={name}
          className="rounded-lg w-full"
        />

      </Link>

      {/* Name */}

      <h2 className="mt-2 font-semibold">

        {name}

      </h2>

      {/* Rating */}

      <p className="text-yellow-500 text-sm">

        ★★★★☆

      </p>

      {/* Price */}

      <div className="flex gap-2 items-center">

        <p className="text-pink-600 font-bold">

          ₹{price}

        </p>

        {oldPrice && (

          <p className="line-through text-gray-400 text-sm">

            ₹{oldPrice}

          </p>

        )}

      </div>

      {/* Add to Cart */}

      <button
        onClick={() => {

          const product: Product = {

            _id,

            name,

            price,

            mrp: oldPrice || price,

            category: "General",

            images: [image],

            stock: 1

          }

          addToCart(product)

        }}
        className="w-full mt-3 bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
      >

        Add to Cart

      </button>

    </div>

  )

}