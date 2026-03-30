"use client"

import { useEffect, useState } from "react"

export default function AdminOrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([])

  // Load Orders

  useEffect(() => {

    const loggedIn =
      localStorage.getItem(
        "adminLoggedIn"
      )

    if (!loggedIn) {

      window.location.href =
        "/admin/login"

      return

    }

    try {

      const savedOrders =
        JSON.parse(
          localStorage.getItem(
            "orders"
          ) || "[]"
        )

      setOrders(savedOrders)

    }

    catch {

      setOrders([])

    }

  }, [])

  // Update Status

  const updateStatus =
    (index: number, status: string) => {

      const updatedOrders =
        [...orders]

      updatedOrders[index].status =
        status

      setOrders(updatedOrders)

      localStorage.setItem(
        "orders",
        JSON.stringify(updatedOrders)
      )

    }

  return (

    <div className="p-10 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">

        Admin Orders 📦

      </h1>

      {orders.length === 0 && (

        <p>No orders yet</p>

      )}

      {orders.map(
        (order, index) => (

          <div
            key={index}
            className="border p-5 mb-6 rounded bg-gray-50"
          >

            <h2 className="font-bold text-lg">

              Order #{index + 1}

            </h2>

            <p>Name: {order.name}</p>

            <p>Phone: {order.phone}</p>

            <p>Address: {order.address}</p>

            <p>Pincode: {order.pincode}</p>

            {/* Status */}

            <p className="font-bold mt-2">

              Status:
              {" "}
              {order.status || "Pending"}

            </p>

            {/* Status Buttons */}

            <div className="flex gap-2 mt-3">

              <button
                onClick={() =>
                  updateStatus(
                    index,
                    "Shipped"
                  )
                }
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >

                Mark Shipped

              </button>

              <button
                onClick={() =>
                  updateStatus(
                    index,
                    "Delivered"
                  )
                }
                className="bg-green-600 text-white px-3 py-1 rounded"
              >

                Mark Delivered

              </button>

            </div>

            {/* Items */}

            <div className="mt-3">

              <h3 className="font-bold">

                Items:

              </h3>

              {(order.items || []).map(
                (item: any, i: number) => (

                  <div
                    key={i}
                    className="border p-2 mt-2 rounded bg-white"
                  >

                    {item.product.name}

                    {" "}x{" "}

                    {item.quantity}

                  </div>

                )
              )}

            </div>

            <p className="font-bold mt-3">

              Total: ₹{order.total}

            </p>

          </div>

        )
      )}

    </div>

  )

}