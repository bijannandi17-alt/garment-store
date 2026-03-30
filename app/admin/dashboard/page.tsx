"use client"

import { useEffect, useState } from "react"

export default function AdminDashboard() {

  const [orders, setOrders] =
    useState<any[]>([])

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

  // 📊 Metrics

  const totalOrders =
    orders.length

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + Number(order.total || 0),
      0
    )

  const pendingOrders =
    orders.filter(
      (o) =>
        !o.status ||
        o.status === "Pending"
    ).length

  const deliveredOrders =
    orders.filter(
      (o) =>
        o.status === "Delivered"
    ).length

  // 📅 Today's Sales (Safe Date)

  const today =
    new Date().toDateString()

  const todayRevenue =
    orders
      .filter(
        (o) =>
          o.date &&
          new Date(o.date)
            .toDateString() === today
      )
      .reduce(
        (sum, o) =>
          sum + Number(o.total || 0),
        0
      )

  // 🔐 Logout

  const handleLogout = () => {

    localStorage.removeItem(
      "adminLoggedIn"
    )

    window.location.href =
      "/admin/login"

  }

  // 🎨 Status Colors

  const getStatusColor =
    (status: string) => {

      if (status === "Delivered")
        return "bg-green-500"

      if (status === "Shipped")
        return "bg-blue-500"

      return "bg-yellow-500"

    }

  return (

    <div className="p-6 md:p-10 max-w-7xl mx-auto">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

        <h1 className="text-3xl font-bold">

          Admin Dashboard 📊

        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >

          Logout 🔐

        </button>

      </div>

      {/* Navigation */}

      <div className="flex gap-4 mb-8">

        <a
          href="/admin/orders"
          className="bg-black text-white px-4 py-2 rounded"
        >

          View Orders 📦

        </a>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

        <Card
          title="📦 Orders"
          value={totalOrders}
        />

        <Card
          title="💰 Revenue"
          value={`₹${totalRevenue}`}
        />

        <Card
          title="🚚 Pending"
          value={pendingOrders}
        />

        <Card
          title="✅ Delivered"
          value={deliveredOrders}
        />

        <Card
          title="📅 Today"
          value={`₹${todayRevenue}`}
        />

      </div>

      {/* Recent Orders */}

      <h2 className="text-xl font-bold mb-4">

        Recent Orders 📋

      </h2>

      <div className="border rounded overflow-x-auto">

        {orders.length === 0 ? (

          <p className="p-6 text-center text-gray-500">

            No recent orders yet

          </p>

        ) : (

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">

                  Customer

                </th>

                <th className="p-3 text-left">

                  Phone

                </th>

                <th className="p-3 text-left">

                  Total

                </th>

                <th className="p-3 text-left">

                  Status

                </th>

              </tr>

            </thead>

            <tbody>

              {orders
                .slice(-5)
                .reverse()
                .map(
                  (order, i) => (

                    <tr
                      key={i}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-3">

                        {order.name || "N/A"}

                      </td>

                      <td className="p-3">

                        {order.phone || "N/A"}

                      </td>

                      <td className="p-3">

                        ₹{order.total || 0}

                      </td>

                      <td className="p-3">

                        <span
                          className={`${getStatusColor(
                            order.status
                          )} text-white px-2 py-1 rounded text-sm`}
                        >

                          {order.status ||
                            "Pending"}

                        </span>

                      </td>

                    </tr>

                  )
                )}

            </tbody>

          </table>

        )}

      </div>

    </div>

  )

}

// 📦 Card Component

function Card({
  title,
  value
}: any) {

  return (

    <div className="bg-white shadow rounded p-6 text-center border hover:shadow-md transition">

      <h2 className="text-lg font-bold">

        {title}

      </h2>

      <p className="text-2xl font-bold mt-2">

        {value}

      </p>

    </div>

  )

}