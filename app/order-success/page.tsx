"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"



/* ------------------------------
   INNER COMPONENT
   ------------------------------ */

function OrderSuccessContent() {

  const searchParams =
    useSearchParams()

  const orderId =
    searchParams.get("orderId")

  const [order, setOrder] =
    useState<any>(null)



  useEffect(() => {

    if (!orderId) return

    const orders =
      JSON.parse(
        localStorage.getItem(
          "orders"
        ) || "[]"
      )

    const found =
      orders.find(
        (o: any) =>
          o.id === orderId
      )

    setOrder(found)

  }, [orderId])



  if (!order) {

    return (

      <div className="p-10 text-center">

        Loading order...

      </div>

    )

  }



  const items =
    order.items || []



  return (

    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold text-green-600 mb-6">

        ✅ Order Sent Successfully!

      </h1>

      <div className="border p-6 rounded bg-gray-50">

        <h2 className="text-xl font-bold mb-2">

          Order ID:
          {" "}
          {order.id}

        </h2>



        {/* CUSTOMER DETAILS */}

        <p>
          👤 Name:
          {" "}
          {order.customer?.name}
        </p>

        <p>
          📞 Phone:
          {" "}
          {order.customer?.phone}
        </p>

        <p>
          🏠 Address:
          {" "}
          {order.customer?.address}
        </p>

        <p>
          📮 Pincode:
          {" "}
          {order.customer?.pincode}
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

                <p>

                  {item.product.name}

                </p>

                <p>

                  Qty:
                  {" "}
                  {item.quantity}

                </p>

                <p>

                  ₹
                  {item.product.price *
                    item.quantity}

                </p>

              </div>

            )
          )}

        </div>



        <p className="font-bold text-lg mt-6">

          Total:
          {" "}
          ₹{order.total}

        </p>

      </div>

    </div>

  )

}



/* ------------------------------
   MAIN PAGE (Suspense Wrapper)
   ------------------------------ */

export default function OrderSuccessPage() {

  return (

    <Suspense
      fallback={
        <div className="p-10 text-center">
          Loading order details...
        </div>
      }
    >

      <OrderSuccessContent />

    </Suspense>

  )

}