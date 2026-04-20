"use client"

import { supportedPincodes } from "@/data/pincodes"
import { useContext, useState } from "react"
import { CartContext } from "../../lib/cartContext"

export default function CheckoutPage() {

  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Cart not available</div>
  }

  const { cart, clearCart } = cartContext

  /* 🟢 CUSTOMER DETAILS */

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")

  /* 🟢 PAYMENT METHOD */

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

      if (
        !name ||
        !phone ||
        !address ||
        !pincode
      ) {

        alert(
          "Please fill all details"
        )

        return null

      }

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

        items: cart,

        total: finalTotal,

        paymentMethod,

        status: "Pending",

        createdAt:
          new Date()
      }

      await saveOrderToDB(orderData)

      /* Save Local */

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

      clearCart()

      return orderId

    }

  /* 🟢 WHATSAPP ORDER */

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

      window.location.href =
        `/order-success?orderId=${orderId}`

    }

  /* 🟢 COD ORDER */

  const handleCODOrder =
    async () => {

      const orderId =
        await createOrder()

      if (!orderId) return

      window.location.href =
        `/order-success?orderId=${orderId}`

    }

  /* 🟢 UPI PAYMENT */

  const handleUPIOrder =
    async () => {

      const orderId =
        await createOrder()

      if (!orderId) return

      const upiId =
        "yourupi@okaxis"   // change this

      const url =
`upi://pay?pa=${upiId}&pn=Amropali Fashion&am=${finalTotal}&cu=INR`

      window.location.href = url

      setTimeout(() => {

        window.location.href =
          `/order-success?orderId=${orderId}`

      }, 3000)

    }

  /* 🟢 MAIN PLACE ORDER */

  const handlePlaceOrder =
    () => {

      if (
        paymentMethod === "whatsapp"
      ) {

        handleWhatsAppOrder()

      }

      else if (
        paymentMethod === "cod"
      ) {

        handleCODOrder()

      }

      else if (
        paymentMethod === "upi"
      ) {

        handleUPIOrder()

      }

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

      {/* PAYMENT METHOD */}

      <div className="mt-8 border p-4 rounded">

        <h3 className="font-bold mb-3">
          Select Payment Method 💳
        </h3>

        <label className="block mb-2">

          <input
            type="radio"
            value="whatsapp"
            checked={
              paymentMethod === "whatsapp"
            }
            onChange={() =>
              setPaymentMethod("whatsapp")
            }
          />

          {" "}WhatsApp Order 📱

        </label>

        <label className="block mb-2">

          <input
            type="radio"
            value="cod"
            checked={
              paymentMethod === "cod"
            }
            onChange={() =>
              setPaymentMethod("cod")
            }
          />

          {" "}Cash on Delivery 💰

        </label>

        <label className="block">

          <input
            type="radio"
            value="upi"
            checked={
              paymentMethod === "upi"
            }
            onChange={() =>
              setPaymentMethod("upi")
            }
          />

          {" "}UPI Payment 📲

        </label>

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