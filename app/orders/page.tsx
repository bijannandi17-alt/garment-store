"use client"

import { useEffect, useState } from "react"

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)



  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const res =
            await fetch(
              "/api/orders"
            )

          const data =
            await res.json()

          if (data.success) {

            setOrders(
              data.orders
            )

          }

        }

        catch (error) {

          console.log(
            "Fetch Orders Error:",
            error
          )

        }

        finally {

          setLoading(false)

        }

      }

    fetchOrders()

  }, [])



  if (loading) {

    return (

      <div className="p-10 text-center">
        Loading orders...
      </div>

    )

  }



  return (

    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">

        Order History 📦

      </h1>



      {orders.length === 0 && (

        <p>No orders yet</p>

      )}



      {orders.map(
        (order: any) => (

          <div
            key={order._id}
            className="border p-4 mb-6 rounded bg-white shadow"
          >

            <h2 className="font-bold text-lg mb-2">

              Order ID:
              {" "}
              {order.orderId}

            </h2>



            <p>
              👤 {order.name}
            </p>

            <p>
              📞 {order.phone}
            </p>

            <p>
              🏠 {order.address}
            </p>



            {/* 🟢 ITEMS */}

            <div className="mt-3">

              <h3 className="font-semibold">
                Ordered Items:
              </h3>

              {order.items?.map(
                (
                  item: any,
                  i: number
                ) => (

                  <div
                    key={i}
                    className="flex items-center gap-3 ml-4 mt-2"
                  >

                    {/* IMAGE */}

                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/60"
                      }
                      className="w-14 h-14 rounded object-cover"
                      alt={item.name}
                    />

                    <div>

                      <p>
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-600">

                        {item.qty} × ₹
                        {item.price}

                        {" "} = ₹

                        {item.qty *
                          item.price}

                      </p>

                    </div>

                  </div>

                )
              )}

            </div>



            {/* TOTAL */}

            <p className="font-bold mt-3">

              Total: ₹
              {order.total}

            </p>



            {/* STATUS */}

            <p>

              Status:
              {" "}

              <span className="font-semibold">

                {order.status}

              </span>

            </p>



            {/* DATE */}

            <p className="text-sm text-gray-500">

              {new Date(
                order.createdAt
              ).toLocaleString()}

            </p>

          </div>

        )
      )}

    </div>

  )

}