"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function OrderSuccessPage() {

  const searchParams = useSearchParams()

  const orderId =
    searchParams.get("orderId")

  const [order, setOrder] =
    useState<any>(null)

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

  /* 🟢 LOAD ORDER */

  useEffect(() => {

    if (!orderId) return

    const orders =
      JSON.parse(
        localStorage.getItem("orders")
        || "[]"
      )

    const foundOrder =
      orders.find(
        (o: any) =>
          o.id === orderId
      )

    setOrder(foundOrder)

  }, [orderId])

  if (!order) {

    return (

      <div className="p-10 text-center">

        <h1 className="text-2xl font-bold">

          Loading Order...

        </h1>

      </div>

    )

  }

  return (

    <div className="p-6 max-w-4xl mx-auto">

      {/* SUCCESS HEADER */}

      <div className="text-center mb-8">

        <h1 className="text-3xl font-bold text-green-600">

          ✅ Order Confirmed!

        </h1>

        <p className="text-gray-600 mt-2">

          Order ID:
          <b> {order.id} </b>

        </p>

        <p className="text-sm text-gray-500 mt-1">

          Delivery by
          <b> {formattedDate} </b>

        </p>

      </div>

      {/* CUSTOMER DETAILS */}

      <div className="border p-5 rounded mb-6 bg-gray-50">

        <h2 className="font-bold mb-3">

          👤 Customer Details

        </h2>

        <p>

          <b>Name:</b>
          {" "}
          {order.customer.name}

        </p>

        <p>

          <b>Phone:</b>
          {" "}
          {order.customer.phone}

        </p>

        <p>

          <b>Address:</b>
          {" "}
          {order.customer.address}

        </p>

        <p>

          <b>Pincode:</b>
          {" "}
          {order.customer.pincode}

        </p>

      </div>

      {/* PAYMENT METHOD */}

      <div className="border p-5 rounded mb-6">

        <h2 className="font-bold mb-2">

          💳 Payment Method

        </h2>

        <p className="text-green-600 font-semibold">

          {order.paymentMethod.toUpperCase()}

        </p>

      </div>

      {/* ITEMS */}

      <div className="border p-5 rounded mb-6">

        <h2 className="font-bold mb-4">

          🛍 Items Ordered

        </h2>

        {order.items.map(
          (item: any, index: number) => {

            const product =
              item.product

            const imageSrc =
              product.images?.[0] ||
              "https://via.placeholder.com/150"

            return (

              <div
                key={index}
                className="flex gap-4 border-b py-4"
              >

                <img
                  src={imageSrc}
                  className="w-20 h-20 object-cover rounded"
                  alt={product.name}
                />

                <div className="flex-1">

                  <p className="font-semibold">

                    {product.name}

                  </p>

                  <p className="text-sm text-gray-500">

                    Size:
                    {" "}
                    {item.selectedSize || "FREE"}

                  </p>

                  <p className="text-sm">

                    Qty:
                    {" "}
                    {item.quantity}

                  </p>

                  <p className="text-pink-600 font-bold">

                    ₹
                    {product.price *
                      item.quantity}

                  </p>

                </div>

              </div>

            )

          }

        )}

      </div>

      {/* TOTAL */}

      <div className="border p-5 rounded bg-gray-50">

        <h2 className="font-bold mb-3">

          💰 Order Summary

        </h2>

        <h2 className="text-xl font-bold">

          Total Paid:
          {" "}
          ₹{order.total}

        </h2>

      </div>

      {/* BUTTONS */}

      <div className="mt-8 text-center space-y-4">

        <Link href="/products">

          <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">

            Continue Shopping 🛍

          </button>

        </Link>

        <Link href="/orders">

          <button className="border px-6 py-3 rounded">

            View My Orders 📦

          </button>

        </Link>

      </div>

    </div>

  )

}