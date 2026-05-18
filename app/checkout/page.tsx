"use client"

import { supportedPincodes } from "@/data/pincodes"
import { useContext, useState } from "react"
import { CartContext } from "../../lib/cartContext"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {

  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Cart not available</div>
  }

  const { cart, clearCart } = cartContext

  /* 🟢 CUSTOMER */

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")

  /* 🟢 PAYMENT */

  const [paymentMethod, setPaymentMethod] =
    useState("whatsapp")

  /* 🟢 TOTAL */

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (item.product.price || 0) *
      item.quantity,
    0
  )

  const deliveryCharge =
    total >= 999 ? 0 : 60

  const finalTotal =
    total + deliveryCharge

  /* 🟢 VALIDATION */

  const validateForm = () => {

    if (
      !name ||
      !phone ||
      !address ||
      !pincode
    ) {

      alert("Please fill all details")
      return false

    }

    if (phone.length !== 10) {

      alert("Enter valid 10-digit phone")
      return false

    }

    if (
      !supportedPincodes.includes(pincode)
    ) {

      alert("Delivery not available to this pincode")
      return false

    }

    if (cart.length === 0) {

      alert("Cart is empty")
      return false

    }

    return true
  }

  /* 🟢 SAVE ORDER */

  const saveOrderToDB =
    async (orderData: any) => {

      try {

        const response =
          await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify(orderData),
          })

        return await response.json()

      }

      catch (error) {

        console.log(
          "DB Error:",
          error
        )

      }

    }

  /* 🟢 CREATE ORDER */

  const createOrder =
    async () => {

      if (!validateForm()) return null

      const orderId =
        "ORD" + Date.now()

      const orderData = {

        id: orderId,

        customer: {
          name,
          phone,
          address,
          pincode
        },

        /* ⭐ FIXED */
        items: JSON.parse(
          JSON.stringify(cart)
        ),

        total: finalTotal,

        paymentMethod,

        status: "Pending",

        createdAt:
          new Date()
      }

      await saveOrderToDB(orderData)

      /* Local Backup */

      const existingOrders =
        JSON.parse(
          localStorage.getItem("orders")
          || "[]"
        )

      existingOrders.push(orderData)

      localStorage.setItem(
        "orders",
        JSON.stringify(existingOrders)
      )

      return orderId

    }

  /* 🟢 WHATSAPP */

  const handleWhatsAppOrder =
    async () => {

      const orderId =
        await createOrder()

      if (!orderId) return

      const whatsappNumber =
        "918951270795"

      const url =
`https://wa.me/${whatsappNumber}?text=New Order ID: ${orderId}`

      window.open(url, "_blank")

      clearCart()

      window.location.href =
        `/order-success?orderId=${orderId}`

    }

  /* 🟢 COD */

  const handleCODOrder =
    async () => {

      const orderId =
        await createOrder()

      if (!orderId) return

      clearCart()

      window.location.href =
        `/order-success?orderId=${orderId}`

    }

  /* 🟢 UPI */

  const handleUPIOrder =
    async () => {

      const orderId =
        await createOrder()

      if (!orderId) return

      const upiId =
        "yourupi@okaxis" // CHANGE

      const url =
`upi://pay?pa=${upiId}&pn=Amropali Fashion&am=${finalTotal}&cu=INR`

      /* ⭐ FIXED */

      window.open(url, "_blank")

      clearCart()

      setTimeout(() => {

        window.location.href =
          `/order-success?orderId=${orderId}`

      }, 3000)

    }

  /* 🟢 RAZORPAY */

  const handleRazorpayPayment =
    async () => {

      const orderId =
        await createOrder()

      if (!orderId) return

      const options = {

        key:
          "YOUR_RAZORPAY_KEY", // replace

        amount:
          finalTotal * 100,

        currency:
          "INR",

        name:
          "Amropali Fashion",

        description:
          "Order Payment",

        handler: function () {

          clearCart()

          window.location.href =
            `/order-success?orderId=${orderId}`

        },

        prefill: {

          name,
          contact: phone

        },

        theme: {

          color: "#16a34a"

        }

      }

      const rzp =
        new window.Razorpay(options)

      rzp.open()

    }

  /* 🟢 MAIN */

  const handlePlaceOrder =
    () => {

      if (paymentMethod === "whatsapp")
        handleWhatsAppOrder()

      else if (paymentMethod === "cod")
        handleCODOrder()

      else if (paymentMethod === "upi")
        handleUPIOrder()

      else if (paymentMethod === "card")
        handleRazorpayPayment()

    }

  return (

    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Checkout 🧾
      </h1>

      {/* CUSTOMER */}

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

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) =>
            setPincode(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

      </div>

      {/* PAYMENT */}

      <div className="mt-8 border p-4 rounded">

        <h3 className="font-bold mb-3">
          Select Payment Method 💳
        </h3>

        {[
          ["whatsapp","WhatsApp Order 📱"],
          ["cod","Cash on Delivery 💰"],
          ["upi","UPI Payment 📲"],
          ["card","Card / NetBanking 💳"]
        ].map(([value,label]) => (

          <label key={value} className="block mb-2">

            <input
              type="radio"
              value={value}
              checked={
                paymentMethod === value
              }
              onChange={() =>
                setPaymentMethod(value)
              }
            />

            {" "}{label}

          </label>

        ))}

      </div>

      {/* TOTAL */}

      <div className="mt-8 border p-6 rounded bg-gray-50">

        <h2 className="text-xl font-bold">

          Final Total: ₹{finalTotal}

        </h2>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded"
        >

          Place Order 🚀

        </button>

      </div>

    </div>

  )

}