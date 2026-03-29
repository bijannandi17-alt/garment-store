"use client"

import { useContext, useState } from "react"
import { CartContext } from "../../lib/cartContext"

export default function CheckoutPage() {

  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Cart not available</div>
  }

  const { cart, clearCart } = cartContext

  // 🟢 CUSTOMER DETAILS

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [pincodeError, setPincodeError] = useState("")
  const [phoneError, setPhoneError] = useState("")

  // 🟢 COUPON SYSTEM

  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const [couponMessage, setCouponMessage] = useState("")

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

  // 🟢 APPLY COUPON

  const applyCoupon = () => {

    if (coupon === "SAVE50") {

      setDiscount(50)
      setCouponMessage("₹50 discount applied")

    }

    else if (coupon === "SAVE100") {

      setDiscount(100)
      setCouponMessage("₹100 discount applied")

    }

    else if (coupon === "FREESHIP") {

      setDiscount(deliveryCharge)
      setCouponMessage("Free delivery applied")

    }

    else {

      setDiscount(0)
      setCouponMessage("Invalid coupon")

    }

  }

  // 🟢 FINAL TOTAL

  const finalTotal =
    total +
    deliveryCharge -
    discount

  // 🟢 VALIDATE PINCODE

  const validatePincode = () => {

    const pincodeRegex = /^[1-9][0-9]{5}$/

    if (!pincodeRegex.test(pincode)) {

      setPincodeError(
        "Enter valid 6-digit Indian pincode"
      )

      return false
    }

    return true

  }

  // 🟢 VALIDATE PHONE

  const validatePhone = () => {

    const phoneRegex = /^[6-9][0-9]{9}$/

    if (!phoneRegex.test(phone)) {

      setPhoneError(
        "Enter valid 10-digit mobile number"
      )

      return false
    }

    return true

  }

  // 🟢 WHATSAPP ORDER

  const handleWhatsAppOrder = () => {

    if (!name || !phone || !address || !pincode) {

      alert("Please fill all details")

      return

    }

    if (!validatePhone()) return

    if (!validatePincode()) return

    // 🟢 Generate Order ID

    const orderId =
      "ORD" +
      Date.now()

    // 🟢 Items Text

    const orderItems = cart.map(item =>
      `${item.product.name} x ${item.quantity} = ₹${item.product.price * item.quantity}`
    ).join("%0A")

    // 🟢 WhatsApp Message

    const message =
`🛍️ *New Order - Amropali Fashion*%0A
🆔 Order ID: ${orderId}%0A

👤 Name: ${name}%0A
📞 Phone: ${phone}%0A

🏠 Address:%0A
${address}%0A

📮 Pincode: ${pincode}%0A

📦 *Order Details:*%0A
${orderItems}%0A

Subtotal: ₹${total}%0A
Delivery: ₹${deliveryCharge}%0A
Discount: ₹${discount}%0A
Final Total: ₹${finalTotal}`

    const whatsappNumber =
      "918951270795"

    const url =
`https://wa.me/${whatsappNumber}?text=${message}`

    // 🟢 SAVE ORDER

    const orderData = {

      id: orderId,

      name,
      phone,
      address,
      pincode,

      items: cart,

      coupon,
      discount,

      total: finalTotal,

      status: "Pending",

      date:
        new Date().toLocaleString()

    }

    const existingOrders =
      JSON.parse(
        localStorage.getItem("orders") || "[]"
      )

    existingOrders.push(orderData)

    localStorage.setItem(
      "orders",
      JSON.stringify(existingOrders)
    )

    // 🟢 OPEN WHATSAPP

    window.open(url, "_blank")

    clearCart()

    setTimeout(() => {

      window.location.href =
        "/order-success"

    }, 500)

  }

  return (

    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">

        Checkout 🧾

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
          onChange={(e) => {

            setPhone(e.target.value)
            setPhoneError("")

          }}
          className="w-full border p-3 rounded"
        />

        {phoneError && (

          <p className="text-red-500 text-sm">

            {phoneError}

          </p>

        )}

        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        {/* PINCODE */}

        <div>

          <label className="block font-semibold mb-1">

            Pincode

          </label>

          <input
            type="text"
            placeholder="Enter 6-digit Pincode"
            value={pincode}
            onChange={(e) => {

              setPincode(e.target.value)
              setPincodeError("")

            }}
            className="w-full border p-3 rounded"
            maxLength={6}
          />

          {pincodeError && (

            <p className="text-red-500 text-sm mt-1">

              {pincodeError}

            </p>

          )}

        </div>

      </div>

      {/* COUPON SECTION */}

      <div className="mt-8 border p-4 rounded bg-white">

        <h3 className="font-bold mb-2">

          Apply Coupon 🎟️

        </h3>

        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) =>
              setCoupon(
                e.target.value.toUpperCase()
              )
            }
            className="flex-1 border p-2 rounded"
          />

          <button
            onClick={applyCoupon}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >

            Apply

          </button>

        </div>

        {couponMessage && (

          <p className="text-sm mt-2 text-green-600">

            {couponMessage}

          </p>

        )}

      </div>

      {/* ORDER SUMMARY */}

      <div className="mt-8 border p-6 rounded bg-gray-50">

        <h2 className="text-xl font-bold mb-4">

          Order Summary 📦

        </h2>

        <p>

          Subtotal: ₹{total}

        </p>

        <p>

          Delivery: ₹{deliveryCharge}

        </p>

        <p>

          Discount: ₹{discount}

        </p>

        <h2 className="text-xl font-bold mt-2">

          Final Total: ₹{finalTotal}

        </h2>

        <button
          onClick={handleWhatsAppOrder}
          className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >

          Place Order via WhatsApp 📱

        </button>

      </div>

    </div>

  )

}