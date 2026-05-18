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

  /* 🟢 DELIVERY DATE */

  const deliveryDate = new Date()

  deliveryDate.setDate(
    deliveryDate.getDate() + 4
  )

  const formattedDate =
    deliveryDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short"
      }
    )

  /* 🟢 EMPTY CART */

  if (cart.length === 0) {

    return (

      <div className="p-10 text-center">

        <h1 className="text-3xl font-bold mb-4">
          🛒 Your Cart is Empty
        </h1>

        <p className="text-gray-500 mb-6">
          Add products to start shopping
        </p>

        <Link href="/products">

          <button className="bg-green-600 text-white px-6 py-3 rounded">

            Continue Shopping

          </button>

        </Link>

      </div>

    )

  }

  return (

    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">

        Your Cart 🛒

      </h1>

      {/* GRID LAYOUT */}

      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE — ITEMS */}

        <div className="md:col-span-2">

          {/* DELIVERY INFO */}

          <div className="border p-4 rounded mb-6 bg-gray-50">

            <p className="font-bold">
              🚚 Delivery Info
            </p>

            <p className="text-sm text-gray-600">

              Delivery by <b>{formattedDate}</b>

            </p>

            <p className="text-sm text-green-600">

              Free delivery above ₹999

            </p>

          </div>

          {/* CART ITEMS */}

          {cart.map(item => {

            const product = item.product

            const imageSrc =
              product.images?.[0] ||
              "https://via.placeholder.com/150"

            /* 🟢 DISCOUNT */

            const discount =
              product.mrp
                ? Math.round(
                    (
                      (
                        product.mrp -
                        product.price
                      ) /
                      product.mrp
                    ) * 100
                  )
                : 0

            return (

              <div
                key={`${product._id}-${item.selectedSize}`}
                className="flex gap-6 border-b py-5"
              >

                {/* IMAGE */}

                <img
                  src={imageSrc}
                  className="w-28 h-28 rounded object-cover"
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

                  <div className="flex items-center gap-3 mt-2">

                    <p className="text-pink-600 font-bold text-lg">

                      ₹{product.price}

                    </p>

                    {product.mrp > 0 && (

                      <p className="text-sm line-through text-gray-400">

                        ₹{product.mrp}

                      </p>

                    )}

                    {discount > 0 && (

                      <span className="text-green-600 text-sm font-bold">

                        {discount}% OFF

                      </span>

                    )}

                  </div>

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

                    🗑 Remove

                  </button>

                </div>

              </div>

            )

          })}

        </div>

        {/* RIGHT SIDE — PRICE BOX */}

        <div className="sticky top-24 h-fit">

          <div className="border p-6 rounded bg-gray-50">

            <h2 className="text-xl font-bold mb-4">

              Price Details

            </h2>

            <div className="space-y-2 text-sm">

              <p>

                Subtotal: ₹{total}

              </p>

              {savedAmount > 0 && (

                <p className="text-green-600 font-bold">

                  You Saved: ₹{savedAmount}

                </p>

              )}

              <p>

                Delivery: ₹{deliveryCharge}

              </p>

              <hr />

              <h2 className="text-lg font-bold">

                Final Total: ₹{finalTotal}

              </h2>

            </div>

            {/* TRUST BADGES */}

            <div className="mt-6 text-sm text-gray-600 space-y-1">

              <p>✔ Cash on Delivery Available</p>

              <p>✔ 7 Days Easy Return</p>

              <p>✔ 100% Quality Check</p>

              <p>🔒 Secure Payments</p>

            </div>

            {/* CHECKOUT */}

            <Link href="/checkout">

              <button className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">

                Proceed to Checkout 🚀

              </button>

            </Link>

          </div>

        </div>

      </div>

    </div>

  )

}