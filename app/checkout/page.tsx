"use client"

import { useContext, useState } from "react"
import { CartContext } from "../../lib/cartContext"

export default function CheckoutPage() {

  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Cart not available</div>
  }

  const { cart } = cartContext

  // 🟢 TOTAL
  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.product.price *
      item.quantity,
    0
  )

  // 🟢 DELIVERY
  const deliveryCharge =
    total >= 999 ? 0 : 60

  const finalTotal =
    total + deliveryCharge

  // 🟢 CUSTOMER DETAILS
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  // 🟢 WHATSAPP FUNCTION
  const handleWhatsAppOrder = () => {

    if (!name || !phone || !address) {
      alert("Please fill all details")
      return
    }

    // Create order items
    const orderItems = cart.map(item =>
      `${item.product.name} x ${item.quantity} = ₹${item.product.price * item.quantity}`
    ).join("%0A")

    const message =
`New Order:%0A
Name: ${name}%0A
Phone: ${phone}%0A
Address: ${address}%0A

${orderItems}%0A

Subtotal: ₹${total}%0A
Delivery: ₹${deliveryCharge}%0A
Final Total: ₹${finalTotal}`

    const whatsappNumber = "918951270795"

    const url =
`https://wa.me/${whatsappNumber}?text=${message}`

    // 🟢 Save order locally
    const orderData = {
      name,
      phone,
      address,
      cart,
      total: finalTotal,
      date: new Date()
    }

   // 🟢 Get existing orders
const existingOrders =
  JSON.parse(
    localStorage.getItem("orders") || "[]"
  )

// 🟢 Add new order
existingOrders.push(orderData)

// 🟢 Save back
localStorage.setItem(
  "orders",
  JSON.stringify(existingOrders)
)

    // 🟢 Open WhatsApp
    window.open(url, "_blank")

    // 🟢 Go to success page
    window.location.href = "/order-success"

  }

  return (

    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      {/* CUSTOMER DETAILS */}

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

      </div>

      {/* ORDER SUMMARY */}

      <div className="mt-8">

        <p>
          Subtotal: ₹{total}
        </p>

        <p>
          Delivery: ₹{deliveryCharge}
        </p>

        <h2 className="text-xl font-bold">
          Final Total: ₹{finalTotal}
        </h2>

        <button
          onClick={handleWhatsAppOrder}
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Place Order via WhatsApp 📱
        </button>

      </div>

    </div>

  )

}