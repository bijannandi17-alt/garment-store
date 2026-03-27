"use client"

import { useState, useContext, use } from "react"
import { CartContext } from "../../../lib/cartContext"
import { products } from "../../../data/products"

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  // ✅ REQUIRED for Next.js 16
  const { id } = use(params)

  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Cart not available</div>
  }

  const { addToCart } = cartContext

  // ✅ Find product
  const product = products.find(
    (p) => p.id === Number(id)
  )

  if (!product) {
    return <div className="p-10">Product not found</div>
  }

  // ✅ Image state
  const [selectedImage, setSelectedImage] =
    useState(product.image[0])

  const [size, setSize] =
    useState("Free Size")

  return (

    <div className="p-10 grid md:grid-cols-2 gap-10">

      {/* LEFT */}

      <div>

        <img
          src={selectedImage}
          className="rounded-xl w-full"
          alt={product.name}
        />

        <div className="flex gap-3 mt-4">

          {product.image.map((img, i) => (

            <img
              key={i}
              src={img}
              onClick={() =>
                setSelectedImage(img)
              }
              className="w-20 h-20 rounded cursor-pointer border"
              alt={`Thumbnail ${i}`}
            />

          ))}

        </div>

      </div>

      {/* RIGHT */}

      <div>

        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-pink-600 text-2xl mt-3">
          ₹{product.price}
        </p>

        {product.oldPrice && (

          <p className="line-through text-gray-400">
            ₹{product.oldPrice}
          </p>

        )}

        {/* SIZE */}

        <div className="mt-6">

          <h2 className="font-bold">
            Select Size
          </h2>

          <div className="flex gap-3 mt-2">

            {["Free Size", "XL"].map((s) => (

              <button
                key={s}
                onClick={() =>
                  setSize(s)
                }
                className={`px-4 py-2 border rounded ${
                  size === s
                    ? "bg-pink-600 text-white"
                    : ""
                }`}
              >

                {s}

              </button>

            ))}

          </div>

        </div>

        {/* DELIVERY */}

        <div className="mt-6">

          <p className="text-green-600">
            ✔ Free Delivery
          </p>

          <p className="text-gray-600">
            ✔ 7 Days Return
          </p>

        </div>

        {/* ADD TO CART */}

        <button
  onClick={() => {
    console.log("Button clicked")
    addToCart(product)
  }}
  className="bg-pink-600 text-white px-6 py-3 mt-6 rounded"
>
  Add to Cart
</button>

      </div>

    </div>

  )

}