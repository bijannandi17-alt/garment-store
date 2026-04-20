"use client"

import { useEffect, useState } from "react"

export default function AdminOrdersPage() {

  const [search, setSearch] =
    useState("")

  const [orders, setOrders] =
    useState<any[]>([])

  const [stats, setStats] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)



  /* 🟢 Fetch Orders */

  async function fetchOrders() {

    try {

      setLoading(true)

      const res =
        await fetch("/api/orders")

      const data =
        await res.json()

      if (data.success) {

        setOrders(
          data.orders || []
        )

        setStats(
          data.stats || null
        )

      }

    }

    catch (error) {

      console.log(
        "Fetch Error:",
        error
      )

    }

    finally {

      setLoading(false)

    }

  }



  /* 🟢 Load */

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

    fetchOrders()

  }, [])



  /* 🟢 Update Status */

  async function updateStatus(
    id: string,
    status: string
  ) {

    try {

      await fetch(
        "/api/orders",
        {

          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            id,
            status
          })

        }
      )

      fetchOrders()

    }

    catch (error) {

      console.log(
        "Status Error:",
        error
      )

    }

  }



  /* 🟢 Delete */

  async function deleteOrder(
    id: string
  ) {

    const ok =
      confirm(
        "Delete this order?"
      )

    if (!ok) return



    try {

      await fetch(
        "/api/orders",
        {

          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            id
          })

        }
      )

      fetchOrders()

    }

    catch (error) {

      console.log(
        "Delete Error:",
        error
      )

    }

  }



  /* 🟢 Status Color */

  function getStatusColor(
    status: string
  ) {

    if (status === "Delivered")
      return "bg-green-100 text-green-700"

    if (status === "Shipped")
      return "bg-blue-100 text-blue-700"

    return "bg-yellow-100 text-yellow-700"

  }



  /* 🟢 Filter */

  const filteredOrders =
    orders.filter(order => {

      const text =
        search.toLowerCase()

      return (

        order.name
          ?.toLowerCase()
          .includes(text)

        ||

        order.phone
          ?.includes(text)

        ||

        order.orderId
          ?.toLowerCase()
          .includes(text)

      )

    })



  return (

    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">

        Admin Orders 📦

      </h1>



      {/* 📊 Stats */}

      {stats && (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">

          <StatBox
            title="Total Orders"
            value={stats.totalOrders}
          />

          <StatBox
            title="Pending"
            value={stats.pendingOrders}
          />

          <StatBox
            title="Shipped"
            value={stats.shippedOrders}
          />

          <StatBox
            title="Delivered"
            value={stats.deliveredOrders}
          />

          <StatBox
            title="Today"
            value={stats.todayOrders}
          />

          <StatBox
            title="Revenue"
            value={`₹${stats.totalRevenue}`}
          />

        </div>

      )}



      {/* 🔍 Search */}

      <input
        type="text"
        placeholder="Search orders 🔍"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border p-3 mb-6 rounded"
      />



      {loading &&
        <p>Loading...</p>}



      {!loading &&
        filteredOrders.map(order => (

          <div
            key={order._id}
            className="border p-5 mb-6 rounded bg-gray-50"
          >

            <div className="flex justify-between">

              <h2 className="font-bold">

                {order.orderId}

              </h2>

              <span
                className={`px-3 py-1 rounded text-sm ${getStatusColor(order.status)}`}
              >

                {order.status}

              </span>

            </div>



            <p className="mt-2">

              {order.name}
              {" — "}
              {order.phone}

            </p>



            <p className="text-sm text-gray-500">

              {order.address}

            </p>



            {/* Items */}

            <div className="mt-3">

              {(order.items || []).map(
                (item: any, i: number) => (

                  <div
                    key={i}
                    className="border p-2 mt-2 rounded bg-white"
                  >

                    {item.name}
                    {" x "}
                    {item.qty}
                    {" — ₹"}
                    {item.price}

                  </div>

                )
              )}

            </div>



            <p className="font-bold mt-3">

              Total ₹{order.total}

            </p>



            <div className="flex gap-2 mt-4">

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Shipped"
                  )
                }
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >

                Ship

              </button>



              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
                className="bg-green-600 text-white px-3 py-1 rounded"
              >

                Deliver

              </button>



              <button
                onClick={() =>
                  deleteOrder(
                    order._id
                  )
                }
                className="bg-red-600 text-white px-3 py-1 rounded"
              >

                Delete

              </button>

            </div>

          </div>

        ))}

    </div>

  )

}



/* 🟢 Stat Box */

function StatBox({
  title,
  value
}: any) {

  return (

    <div className="bg-white border p-4 rounded shadow">

      <p className="text-sm text-gray-500">

        {title}

      </p>

      <p className="text-xl font-bold">

        {value}

      </p>

    </div>

  )

}