"use client"

import { useEffect, useState } from "react"

export default function AdminOrdersPage() {

  const [search, setSearch] = useState("")
  const [orders, setOrders] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  /* 🟢 Fetch Orders */
  async function fetchOrders() {
    try {
      setLoading(true)
      const res = await fetch("/api/orders", { cache: "no-store" }) // Added cache bypass
      const result = await res.json()

      const fetchedOrders = result.data || []
      setOrders(fetchedOrders)

      // Calculate stats manually for the dashboard cards
      const today = new Date().toDateString()
      
      setStats({
        totalOrders: fetchedOrders.length,
        pendingOrders: fetchedOrders.filter((o: any) => o.status === "Pending" || !o.status).length,
        shippedOrders: fetchedOrders.filter((o: any) => o.status === "Shipped").length,
        deliveredOrders: fetchedOrders.filter((o: any) => o.status === "Delivered").length,
        todayOrders: fetchedOrders.filter((o: any) => o.createdAt && new Date(o.createdAt).toDateString() === today).length,
        totalRevenue: fetchedOrders.reduce((sum: number, o: any) => sum + Number(o.total || 0), 0)
      })

    } catch (error) {
      console.log("Fetch Error:", error)
    } finally {
      setLoading(false)
    }
  }

  /* 🟢 Load */
  useEffect(() => {
    // Basic Auth Check
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (!loggedIn) {
      window.location.href = "/admin/login"
      return
    }
    fetchOrders()
  }, [])

  /* 🟢 Update Status */
  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // 🔥 THE FIX: Changed 'id' to '_id' to match the backend expectation
        body: JSON.stringify({ _id: id, status }) 
      })
      
      if(res.ok) {
         fetchOrders() // Refresh the list automatically
      } else {
         const errorData = await res.json()
         alert(`Failed to update: ${errorData.message}`)
      }
    } catch (error) {
      console.log("Status Error:", error)
    }
  }

  /* 🟢 Delete */
  async function deleteOrder(id: string) {
    const ok = window.confirm("Delete this order? This cannot be undone.")
    if (!ok) return

    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // 🔥 THE FIX: Changed 'id' to '_id' to match the backend
        body: JSON.stringify({ _id: id })
      })
      
      if(res.ok) {
        fetchOrders() // Refresh the list
      } else {
        alert("Failed to delete order. Make sure your backend has a DELETE method!")
      }
    } catch (error) {
      console.log("Delete Error:", error)
    }
  }

  /* 🟢 Status Color */
  function getStatusColor(status: string) {
    if (status === "Delivered") return "bg-green-100 text-green-700"
    if (status === "Shipped") return "bg-blue-100 text-blue-700"
    if (status === "Cancelled") return "bg-red-100 text-red-700"
    return "bg-yellow-100 text-yellow-700"
  }

  /* 🟢 Filter */
  const filteredOrders = orders.filter(order => {
    const text = search.toLowerCase()
    return (
      order.name?.toLowerCase().includes(text) ||
      order.phone?.includes(text) ||
      order.orderId?.toLowerCase().includes(text)
    )
  })

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        🧑‍💼 Admin Orders Dashboard
      </h1>

      {/* 📊 Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <StatBox title="Total Orders" value={stats.totalOrders} />
          <StatBox title="Pending" value={stats.pendingOrders} />
          <StatBox title="Shipped" value={stats.shippedOrders} />
          <StatBox title="Delivered" value={stats.deliveredOrders} />
          <StatBox title="Today" value={stats.todayOrders} />
          <StatBox title="Revenue" value={`₹${stats.totalRevenue}`} />
        </div>
      )}

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search orders 🔍"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 mb-6 rounded focus:ring-2 focus:ring-pink-300 outline-none transition-all"
      />

      {loading && (
        <div className="flex justify-center items-center py-10">
           <p className="text-gray-500 font-medium">Loading your orders...</p>
        </div>
      )}

      {!loading && filteredOrders.length === 0 && (
        <p className="text-center text-gray-500 bg-gray-50 p-10 rounded border border-dashed">
          No orders found
        </p>
      )}

      {!loading && filteredOrders.map(order => (
        <div key={order._id} className="border p-5 mb-6 rounded bg-gray-50 shadow-sm hover:shadow transition-shadow">
          {/* HEADER */}
          <div className="flex justify-between items-center border-b pb-3 border-gray-200">
            <h2 className="font-bold text-lg text-gray-800">{order.orderId}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status || "Pending"}
            </span>
          </div>

          {/* CUSTOMER INFO */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
            <p><span className="font-semibold text-gray-500">Customer:</span> {order.name}</p>
            <p><span className="font-semibold text-gray-500">Phone:</span> {order.phone}</p>
            <p className="md:col-span-2"><span className="font-semibold text-gray-500">Address:</span> {order.address}</p>
            <p className="md:col-span-2 text-xs text-gray-400 mt-1">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          {/* ITEMS */}
          <div className="mt-4 pt-3 border-t border-gray-200 space-y-2">
            <p className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wider">Order Items</p>
            {(order.items || []).map((item: any, i: number) => {
              // 🔥 THE FIX: Use online placeholder if image is missing to prevent 404 errors
              const imageSrc = item.image && item.image !== "" ? item.image : "https://placehold.co/100x100/png?text=No+Image"
              
              return (
                <div key={i} className="flex items-center gap-4 border p-2 rounded bg-white shadow-sm">
                  <img 
                    src={imageSrc} 
                    className="w-14 h-14 rounded object-cover border border-gray-100" 
                    alt={item.name} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/100x100/png?text=No+Image"
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-bold text-gray-800 pr-2">₹{item.price * item.qty}</p>
                </div>
              )
            })}
          </div>

          {/* TOTAL & ACTIONS */}
          <div className="mt-5 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-bold text-xl text-pink-600">Total: ₹{order.total}</p>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
              <button 
                onClick={() => updateStatus(order._id, "Shipped")} 
                className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Ship
              </button>
              <button 
                onClick={() => updateStatus(order._id, "Delivered")} 
                className="bg-green-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Deliver
              </button>
              <button 
                onClick={() => updateStatus(order._id, "Cancelled")} 
                className="bg-orange-500 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteOrder(order._id)} 
                className="bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-red-700 transition-colors ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* 🟢 Stat Box */
function StatBox({ title, value }: any) {
  return (
    <div className="bg-white border p-4 rounded-lg shadow-sm text-center flex flex-col justify-center h-full hover:shadow transition-shadow">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  )
}