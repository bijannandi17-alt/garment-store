"use client"
import Link from "next/link"
import { useContext } from "react"
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

  // 🟢 TOTAL
  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.product.price *
      item.quantity,
    0
  )

  return (

    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.length === 0 && (
        <p>Your cart is empty</p>
      )}

      {cart.map(item => (

        <div
          key={item.product.id}
          className="flex items-center gap-6 border-b py-4"
        >

          {/* Image */}

          <img
            src={item.product.image[0]}
            className="w-20 h-20 rounded"
          />

          {/* Info */}

          <div className="flex-1">

            <h2 className="font-bold">
              {item.product.name}
            </h2>

            <p>
              ₹{item.product.price}
            </p>

          </div>

          {/* Quantity */}

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                decreaseQty(
                  item.product.id
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
                  item.product.id
                )
              }
              className="px-3 py-1 border rounded"
            >
              +
            </button>

          </div>

          {/* Remove */}

          <button
            onClick={() =>
              removeItem(
                item.product.id
              )
            }
            className="text-red-500"
          >
            Remove
          </button>

        </div>

      ))}

      {/* TOTAL */}

      {cart.length > 0 && (

        <div className="mt-8 text-right">

          <h2 className="text-2xl font-bold">

            Total: ₹{total}

          </h2>

          <Link href="/checkout">

  <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">

    Proceed to Checkout

  </button>

</Link>

        </div>

      )}

    </div>

  )

}