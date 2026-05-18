"use client";

import { useEffect, useState } from 'react';

// Defining the shape of your order data based on your Mongoose schema
interface OrderItem {
  _id?: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

interface Order {
  _id: string;
  orderId: string;
  name: string;
  phone: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // cache: 'no-store' prevents the browser from caching the empty response
        const response = await fetch('/api/orders', {
          cache: 'no-store' 
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.data && Array.isArray(result.data)) {
          setOrders(result.data);
        } else if (Array.isArray(result)) {
          setOrders(result);
        } else {
          setOrders([]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
          Total Orders: {orders.length}
        </span>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">Loading orders...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
          Error: {error}
        </div>
      )}
      
      {!loading && !error && orders.length === 0 && (
        <div className="text-center bg-gray-50 p-10 rounded-md border border-gray-200">
          <p className="text-gray-600">No orders found.</p>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Order ID</p>
                  <p className="font-semibold text-gray-800">{order.orderId}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex-grow space-y-2 mb-4">
                <p className="text-sm">
                  <span className="text-gray-500">Customer:</span> <span className="font-medium text-gray-800">{order.name}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Phone:</span> <span className="text-gray-800">{order.phone}</span>
                </p>
                
                {/* Items with Images */}
                <div className="mt-4 pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-500 mb-2">Items ({order.items?.length || 0}):</p>
                  <div className="flex flex-col gap-2">
                    {order.items?.map((item, index) => {
                      // Use a valid image or fallback immediately
                      const imageSrc = item.image && item.image !== "" ? item.image : "https://placehold.co/100x100/png?text=No+Image";
                      
                      return (
                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-2 rounded-md">
                          <img 
                            src={imageSrc} 
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded shadow-sm border border-gray-200 bg-white"
                            onError={(e) => {
                              // Fallback if the provided image link is broken
                              (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/png?text=No+Image'; 
                            }}
                          />
                          <div className="flex-grow overflow-hidden">
                            <p className="text-sm font-medium text-gray-700 truncate">{item.name}</p>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Qty: {item.qty}</span>
                              <span className="font-medium text-gray-700">₹{item.price}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer with INVOICE BUTTON */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="font-bold text-lg text-pink-600">
                    ₹{order.total}
                  </p>
                </div>
                
                {/* 🟢 INVOICE BUTTON 🟢 */}
                <a 
                  href={`/api/invoice?orderId=${order.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-50 text-purple-700 border border-purple-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-100 transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                  📄 Invoice
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}