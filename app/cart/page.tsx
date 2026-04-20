"use client"

import { useContext } from "react"
import Link from "next/link"
import { CartContext } from "../../lib/cartContext"

export default function CartPage() {

  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Cart not available</div>
  }

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem
  } = cartContext

  /* 🟢 TOTAL */

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (item.product.price || 0) *
      item.quantity,
    0
  )

  /* 🟢 SAVINGS */

  const savedAmount = cart.reduce(
    (sum, item) =>
      sum +
      (
        (
          (item.product.mrp || 0) -
          (item.product.price || 0)
        )
      ) * item.quantity,
    0
  )

  /* 🟢 DELIVERY */

  const deliveryCharge =
    total >= 999 ? 0 : 60

  const finalTotal =
    total + deliveryCharge

  return (

    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Your Cart 🛒
      </h1>

      {cart.length === 0 && (

        <p className="text-gray-500">
          Your cart is empty
        </p>

      )}

      {/* DELIVERY INFO */}

      {cart.length > 0 && (

        <div className="border p-4 rounded mb-6 bg-gray-50">

          <p className="font-bold">
            🚚 Delivery Info
          </p>

          <p className="text-sm text-gray-600">
            Free delivery above ₹999
          </p>

        </div>

      )}

      {/* CART ITEMS */}

      {cart.map(item => {

        const product = item.product

        /* ✅ FIX IMAGE ERROR */

        const imageSrc =
          product.images?.[0] ||
          "https://via.placeholder.com/150"

        return (

          <div
            key={`${product._id}-${item.selectedSize}`}
            className="flex gap-6 border-b py-5"
          >

            {/* IMAGE */}

            <img
              src={imageSrc}
              className="w-24 h-24 rounded object-cover"
              alt={product.name}
            />

            {/* INFO */}

            <div className="flex-1">

              <h2 className="font-bold text-lg">
                {product.name}
              </h2>

              {/* SIZE */}

              <p className="text-sm text-gray-500">
                Size:
                {item.selectedSize || "FREE"}
              </p>

              {/* PRICE */}

              <p className="text-pink-600 font-bold mt-1">
                ₹{product.price}
              </p>

              {product.mrp > 0 && (

                <p className="text-sm line-through text-gray-400">
                  ₹{product.mrp}
                </p>

              )}

              {/* QUANTITY */}

              <div className="flex items-center gap-2 mt-3">

                <button
                  onClick={() =>
                    decreaseQty(
                      product._id,
                      item.selectedSize
                    )
                  }
                  className="px-3 py-1 border rounded"
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQty(
                      product._id,
                      item.selectedSize
                    )
                  }
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>

              </div>

              {/* REMOVE */}

              <button
                onClick={() =>
                  removeItem(
                    product._id,
                    item.selectedSize
                  )
                }
                className="text-red-500 mt-2 text-sm"
              >
                Remove
              </button>

            </div>

          </div>

        )

      })}

      {/* PRICE SUMMARY */}

      {cart.length > 0 && (

        <div className="mt-8 border p-6 rounded bg-gray-50">

          <h2 className="text-xl font-bold mb-4">
            Price Details
          </h2>

          <p>
            Subtotal: ₹{total}
          </p>

          {savedAmount > 0 && (

            <p className="text-green-600">
              You Saved: ₹{savedAmount}
            </p>

          )}

          <p>
            Delivery: ₹{deliveryCharge}
          </p>

          <h2 className="text-xl font-bold mt-2">
            Final Total: ₹{finalTotal}
          </h2>

        </div>

      )}

      {/* TRUST BADGES */}

      {cart.length > 0 && (

        <div className="mt-6 text-sm text-gray-600">

          ✔ Cash on Delivery Available <br />

          ✔ 7 Days Easy Return <br />

          ✔ 100% Quality Check

        </div>

      )}

      {/* CHECKOUT */}

      {cart.length > 0 && (

        <div className="sticky bottom-0 bg-white p-4 mt-6 border-t">

          <Link href="/checkout">

            <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">

              Proceed to Checkout

            </button>

          </Link>

        </div>

      )}

    </div>

  )

}