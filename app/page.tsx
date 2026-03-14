import Link from "next/link"
import { products } from "../data/products"

export default function Home() {

  return (

    <div>

      {/* HERO BANNER */}

      <div className="bg-pink-100 h-[400px] flex items-center justify-center text-center">
        <div>
          <h1 className="text-5xl font-bold text-pink-700">
            Amropali Fashon
          </h1>

          <p className="mt-4 text-xl">
            Beautiful Cotton Nighties for Everyday Comfort
          </p>

          <Link href="/products">
            <button className="mt-6 bg-pink-600 text-white px-6 py-3 rounded">
              Shop Now
            </button>
          </Link>
        </div>
      </div>


      {/* CATEGORY SECTION */}

      <div className="p-10">

        <h2 className="text-3xl font-bold mb-6">
          Shop by Category
        </h2>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white shadow p-6 text-center rounded">
            Cotton Nighties
          </div>

          <div className="bg-white shadow p-6 text-center rounded">
            Printed Nighties
          </div>

          <div className="bg-white shadow p-6 text-center rounded">
            Daily Wear
          </div>

          <div className="bg-white shadow p-6 text-center rounded">
            Premium Nighties
          </div>

        </div>

      </div>


      {/* TRENDING PRODUCTS */}

      <div className="p-10">

        <h2 className="text-3xl font-bold mb-6">
          Trending Nighties
        </h2>

        <div className="grid grid-cols-4 gap-6">

          {products.map((product) => (

            <Link key={product.id} href={`/product/${product.id}`}>

              <div className="bg-white shadow rounded p-4 hover:shadow-xl transition">

                <img
                  src={product.image}
                  className="rounded-lg"
                />

                <h3 className="mt-2 font-semibold">
                  {product.name}
                </h3>

                <p className="text-pink-600 font-bold">
                  ₹{product.price}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>


      {/* OFFER BANNER */}

      <div className="bg-pink-600 text-white text-center p-16">

        <h2 className="text-4xl font-bold">
          Festival Offer
        </h2>

        <p className="mt-4 text-xl">
          Buy 2 Nighties Get 1 Free
        </p>

      </div>

    </div>

  )

}