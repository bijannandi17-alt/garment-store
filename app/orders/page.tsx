"use client"

import { useEffect, useState } from "react"

export default function OrdersPage() {

  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {

    const savedOrders =
      JSON.parse(
        localStorage.getItem("orders") || "[]"
      )

    setOrders(savedOrders)

  }, [])

  return (

    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Order History 📦
      </h1>

      {orders.length === 0 && (
        <p>No orders yet</p>
      )}

      {orders.map((order, index) => (

        <div
          key={index}
          className="border p-4 mb-6 rounded bg-white shadow"
        >

          <h2 className="font-bold text-lg mb-2">
            Order #{index + 1}
          </h2>

          <p>
            Name: {order.name}
          </p>

          <p>
            Phone: {order.phone}
          </p>

          <p>
            Address: {order.address}
          </p>

          {/* 🟢 PRODUCTS LIST */}

          <div className="mt-3">

            <h3 className="font-semibold">
              Ordered Items:
            </h3>

            {order.cart && order.cart.map(
              (item: any, i: number) => (

                <div
                  key={i}
                  className="ml-4 mt-1"
                >

                  {item.product.name}

                  {" "}x {item.quantity}

                  {" "} = ₹
                  {item.product.price *
                    item.quantity}

                </div>

              )
            )}

          </div>

          {/* 🟢 TOTAL */}

          <p className="font-bold mt-3">
            Total: ₹{order.total}
          </p>

          {/* 🟢 DATE */}

          <p className="text-sm text-gray-500">
            {new Date(order.date)
              .toLocaleString()}
          </p>

        </div>

      ))}

    </div>

  )

}