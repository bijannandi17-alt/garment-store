import { products } from "../data/products"
import ProductCard from "../components/ProductCard"
import Link from "next/link"
import HeroBanner from "../components/HeroBanner"

export default function Home() {

  return (

    <div>
     <HeroBanner/>

      {/* HERO SECTION */}

      <div className="bg-gradient-to-r from-pink-200 to-pink-400 h-[420px] flex items-center justify-center text-center">

        <div>

          <h1 className="text-5xl font-bold text-pink-800">
            Amropali Fashon
          </h1>

          <p className="text-xl mt-4">
            Beautiful Cotton Nighties for Everyday Comfort
          </p>

          <Link href="/products">

            <button className="mt-6 bg-pink-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-pink-700">
              Shop Now
            </button>

          </Link>

        </div>

      </div>



      {/* CATEGORY SECTION */}

      <div className="p-10">

        <h2 className="text-3xl font-bold mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white shadow p-6 rounded text-center hover:shadow-lg cursor-pointer">
            Cotton Nighties
          </div>

          <div className="bg-white shadow p-6 rounded text-center hover:shadow-lg cursor-pointer">
            Printed Nighties
          </div>

          <div className="bg-white shadow p-6 rounded text-center hover:shadow-lg cursor-pointer">
            Daily Wear
          </div>

          <div className="bg-white shadow p-6 rounded text-center hover:shadow-lg cursor-pointer">
            Premium Nighties
          </div>

        </div>

      </div>



      {/* TRENDING PRODUCTS */}

      <div className="p-10">

        <h2 className="text-3xl font-bold mb-8">
          Trending Nighties
        </h2>

        <div className="grid grid-cols-4 gap-6">

          {products.map((product) => (

            <ProductCard
  key={product.id}
  _id={product.id.toString()}
  name={product.name}
  price={product.price}
  oldPrice={product.oldPrice}
  image={product.image[0]}
  hoverImage={product.hoverImage}
/>

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
