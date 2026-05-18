import { products } from "../data/products"
import ProductCard from "../components/ProductCard"
import Link from "next/link"
import HeroBanner from "../components/HeroBanner"

export default function Home() {
  // Placeholder data for the circular category navigation
  const categories = [
    { name: "Cotton Nighties", imgUrl: "/cotton-cat.jpg" },
    { name: "Printed Nighties", imgUrl: "/printed-cat.jpg" },
    { name: "Daily Wear", imgUrl: "/daily-cat.jpg" },
    { name: "Premium Nighties", imgUrl: "/premium-cat.jpg" },
    { name: "Bridal Sets", imgUrl: "/bridal-cat.jpg" },
    { name: "Loungewear", imgUrl: "/lounge-cat.jpg" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* Assuming HeroBanner handles an image carousel */}
      <HeroBanner />

      {/* REFINED HERO SECTION - Bold, Premium, Clean */}
      <div className="relative w-full h-[70vh] min-h-[500px] bg-pink-50 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl space-y-6 z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight uppercase">
            Amro Aura Fashion
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-light">
            Beautiful Cotton Nighties for Everyday Comfort
          </p>
          <div className="pt-4">
            <Link href="/products">
              <button className="bg-pink-600 text-white px-10 py-4 font-bold text-lg uppercase tracking-wide hover:bg-pink-700 transition-colors shadow-lg">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* MYNTRA-STYLE CATEGORY SECTION (Circular Image Bubbles) */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-10 text-center uppercase tracking-widest text-gray-800">
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-pointer">
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gray-100 overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all duration-300 border-2 border-transparent group-hover:border-pink-500">
                {/* Replace this div with next/image once you have your category images */}
                <div className="w-full h-full bg-pink-50 flex items-center justify-center text-pink-300 text-xs text-center px-2">
                  [Img]
                </div>
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-pink-600 transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BRAND FEATURE: THE COMFORT PROMISE */}
      <div className="bg-gray-50 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-gray-800">
            The Comfort Promise
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Experience zero irritation with our signature transparent DTF neck labels. Heat-pressed directly onto the fabric for a completely tagless, seamless feel all night long.
          </p>
        </div>
      </div>

      {/* TRENDING PRODUCTS - Modern Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-gray-800">
            Trending Nighties
          </h2>
          <Link href="/products" className="text-pink-600 font-semibold hover:underline hidden sm:block">
            View All
          </Link>
        </div>
        
        {/* Responsive Grid: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
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
        
        <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="text-pink-600 font-semibold hover:underline">
              View All Products
            </Link>
        </div>
      </div>

      {/* SLEEK OFFER BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white text-center p-10 md:p-20 rounded-sm shadow-xl flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-4">
            Festival Offer
          </h2>
          <p className="text-lg md:text-2xl font-light mb-8">
            Buy 2 Nighties, Get 1 Free. Limited time only.
          </p>
          <button className="bg-white text-pink-800 px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
            Claim Offer
          </button>
        </div>
      </div>

    </div>
  )
}