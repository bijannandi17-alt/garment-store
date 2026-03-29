"use client"

import { useEffect, useState } from "react"

export default function OrderSuccessPage() {

  const [latestOrder, setLatestOrder] =
    useState<any>(null)

  useEffect(() => {

    const orders =
      JSON.parse(
        localStorage.getItem("orders") || "[]"
      )

    if (orders.length > 0) {

      // 🟢 Get latest order
      const lastOrder =
        orders[orders.length - 1]

      setLatestOrder(lastOrder)

    }

  }, [])

  if (!latestOrder) {

    return (

      <div className="p-10 text-center">

        <h1 className="text-2xl font-bold text-green-600">

          ✅ Order Sent Successfully!

        </h1>

        <p className="mt-4">

          Your order has been placed.

        </p>

        <a
          href="/products"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded"
        >
          Continue Shopping 🛍️
        </a>

      </div>

    )

  }

  // ✅ SUPPORT OLD + NEW DATA
  const items =
    latestOrder.items ||
    latestOrder.cart ||
    []

  return (

    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold text-green-600 mb-6">

        ✅ Order Sent Successfully!

      </h1>

      <div className="border p-6 rounded bg-gray-50">

        {/* ORDER HEADER */}

        <h2 className="text-xl font-bold mb-2">

          Order ID:
          {" "}
          {latestOrder.id || "N/A"}

        </h2>

        <p>
          👤 Name:
          {" "}
          {latestOrder.name}
        </p>

        <p>
          📞 Phone:
          {" "}
          {latestOrder.phone}
        </p>

        <p>
          🏠 Address:
          {" "}
          {latestOrder.address}
        </p>

        {latestOrder.pincode && (

          <p>
            📮 Pincode:
            {" "}
            {latestOrder.pincode}
          </p>

        )}

        <p className="mt-1">

          📦 Status:
          {" "}

          <span className="font-semibold text-blue-600">

            {latestOrder.status || "Pending"}

          </span>

        </p>

        {/* ITEMS */}

        <div className="mt-6">

          <h3 className="font-bold mb-3">

            Items Ordered:

          </h3>

          {items.map(
            (item: any, i: number) => (

              <div
                key={i}
                className="border p-3 mb-2 rounded bg-white"
              >

                <p className="font-medium">

                  {item.product.name}

                </p>

                <p className="text-sm">

                  Qty:
                  {" "}
                  {item.quantity}

                </p>

                <p className="text-sm">

                  Price:
                  {" "}
                  ₹{item.product.price}

                </p>

                <p className="font-bold text-sm mt-1">

                  Subtotal:
                  {" "}
                  ₹
                  {item.product.price *
                    item.quantity}

                </p>

              </div>

            )
          )}

        </div>

        {/* TOTAL */}

        <p className="font-bold text-lg mt-6">

          Total:
          {" "}
          ₹{latestOrder.total}

        </p>

        {/* DATE */}

        <p className="text-sm text-gray-500 mt-2">

          {latestOrder.date
            ? new Date(
                latestOrder.date
              ).toLocaleString()
            : ""}

        </p>

      </div>

      {/* CONTINUE SHOPPING */}

      <a
        href="/products"
        className="mt-8 inline-block w-full text-center bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        Continue Shopping 🛍️
      </a>

    </div>

  )

}