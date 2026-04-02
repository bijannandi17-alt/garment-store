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



  // 🟢 Fetch Orders + Stats

  async function fetchOrders() {

    try {

      setLoading(true)

      const res =
        await fetch("/api/orders")

      const data =
        await res.json()

      // FIX: API now returns { orders, stats }

      setOrders(data.orders || [])

      setStats(data.stats || null)

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



  // 🟢 Load Orders

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



  // 🟢 Update Status

  const updateStatus =
    async (
      id: string,
      status: string
    ) => {

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
          "Status Update Error:",
          error
        )

      }

    }



  // 🟢 Delete Order

  const deleteOrder =
    async (id: string) => {

      const confirmDelete =
        confirm(
          "Delete this order?"
        )

      if (!confirmDelete)
        return

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



  // 🟢 Status Colors

  const getStatusColor =
    (status: string) => {

      if (status === "Delivered")
        return "bg-green-100 text-green-700"

      if (status === "Shipped")
        return "bg-blue-100 text-blue-700"

      return "bg-yellow-100 text-yellow-700"

    }



  // 🟢 Filter Orders

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



      {/* 📊 Dashboard Stats */}

      {stats && (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">

          <div className="bg-white border p-4 rounded shadow">

            <p className="text-sm text-gray-500">

              Total Orders

            </p>

            <p className="text-xl font-bold">

              {stats.totalOrders}

            </p>

          </div>



          <div className="bg-yellow-50 border p-4 rounded shadow">

            <p className="text-sm text-gray-500">

              Pending

            </p>

            <p className="text-xl font-bold">

              {stats.pendingOrders}

            </p>

          </div>



          <div className="bg-blue-50 border p-4 rounded shadow">

            <p className="text-sm text-gray-500">

              Shipped

            </p>

            <p className="text-xl font-bold">

              {stats.shippedOrders}

            </p>

          </div>



          <div className="bg-green-50 border p-4 rounded shadow">

            <p className="text-sm text-gray-500">

              Delivered

            </p>

            <p className="text-xl font-bold">

              {stats.deliveredOrders}

            </p>

          </div>



          <div className="bg-purple-50 border p-4 rounded shadow">

            <p className="text-sm text-gray-500">

              Today

            </p>

            <p className="text-xl font-bold">

              {stats.todayOrders}

            </p>

          </div>



          <div className="bg-gray-100 border p-4 rounded shadow">

            <p className="text-sm text-gray-500">

              Revenue

            </p>

            <p className="text-xl font-bold">

              ₹{stats.totalRevenue}

            </p>

          </div>

        </div>

      )}



      {/* 🔍 Search */}

      <input
        type="text"
        placeholder="Search by name, phone or order ID 🔍"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border p-3 mb-6 rounded"
      />



      {loading && (

        <p>Loading orders...</p>

      )}



      {!loading &&
        filteredOrders.length === 0 && (

        <p>No matching orders</p>

      )}



      {/* 🟢 Orders */}

      {filteredOrders.map(
        (order) => (

          <div
            key={order._id}
            className="border p-5 mb-6 rounded bg-gray-50 shadow-sm"
          >

            {/* Header */}

            <div className="flex justify-between items-center flex-wrap">

              <h2 className="font-bold text-lg">

                Order ID:
                {" "}
                {order.orderId || "N/A"}

              </h2>

              <span
                className={`px-3 py-1 rounded text-sm font-semibold ${getStatusColor(order.status)}`}
              >

                {order.status}

              </span>

            </div>



            {/* Customer */}

            <div className="mt-3 space-y-1">

              <p>

                <strong>Name:</strong>
                {" "}
                {order.name}

              </p>

              <p>

                <strong>Phone:</strong>
                {" "}
                {order.phone}

              </p>

              <p>

                <strong>Address:</strong>
                {" "}
                {order.address}

              </p>

              <p>

                <strong>Pincode:</strong>
                {" "}
                {order.pincode}

              </p>

              <p>

                <strong>Date:</strong>
                {" "}

                {order.createdAt
                  ? new Date(
                      order.createdAt
                    ).toLocaleString()
                  : "N/A"}

              </p>

            </div>



            {/* Items */}

            <div className="mt-4">

              <h3 className="font-bold">

                Items:

              </h3>

              {(order.items || []).map(
                (item: any, i: number) => (

                  <div
                    key={i}
                    className="border p-2 mt-2 rounded bg-white"
                  >

                    {item.name || "Item"}

                    {" "}x{" "}

                    {item.qty || 1}

                    {" "}— ₹

                    {item.price || 0}

                  </div>

                )
              )}

            </div>



            {/* Buttons */}

            <div className="flex gap-2 mt-4 flex-wrap">

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Shipped"
                  )
                }
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >

                Mark Shipped

              </button>



              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >

                Mark Delivered

              </button>



              <button
                onClick={() =>
                  deleteOrder(
                    order._id
                  )
                }
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >

                Delete

              </button>

            </div>



            {/* Total */}

            <p className="font-bold mt-4 text-lg">

              Total: ₹{order.total || 0}

            </p>

          </div>

        )
      )}

    </div>

  )

}