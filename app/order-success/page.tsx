export default function OrderSuccessPage() {

  return (

    <div className="p-10 text-center">

      <h1 className="text-3xl font-bold text-green-600">

        ✅ Order Sent Successfully!

      </h1>

      <p className="mt-4 text-lg">

        Thank you for your order.

      </p>

      <p className="text-gray-600 mt-2">

        We will contact you soon on WhatsApp 📱

      </p>

      <a
        href="/products"
        className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded"
      >

        Continue Shopping

      </a>

    </div>

  )

}