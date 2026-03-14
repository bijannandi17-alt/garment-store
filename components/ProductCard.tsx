"use client"

import Link from "next/link"

type Props = {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductCard({ id, name, price, image }: Props) {

  return (

    <Link href={`/product/${id}`}>

      <div className="border rounded-xl shadow p-4 cursor-pointer hover:shadow-xl transition relative">

        {/* Wishlist Icon */}
        <button className="absolute right-3 top-3 text-red-500 text-xl">
          ♡
        </button>

        {/* Product Image */}
        <img
          src={image}
          className="rounded-lg w-full"
        />

        {/* Product Name */}
        <h2 className="text-lg mt-2 font-semibold">
          {name}
        </h2>

        {/* Rating */}
        <p className="text-yellow-500 text-sm">
          ★★★★☆
        </p>

        {/* Price */}
        <p className="text-pink-600 font-bold text-lg">
          ₹{price}
        </p>

      </div>

    </Link>

  )
}