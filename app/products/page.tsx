"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ProductsPage() {

  const [products, setProducts] =
    useState<any[]>([])

  const [filteredProducts,
    setFilteredProducts] =
    useState<any[]>([])

  const [categories,
    setCategories] =
    useState<string[]>(["All"])

  const [loading, setLoading] =
    useState(true)

  const [search,
    setSearch] =
    useState("")

  const [category,
    setCategory] =
    useState("All")

  const [sort,
    setSort] =
    useState("")

  /* ⭐ PRICE FILTER */

  const [minPrice,
    setMinPrice] =
    useState("")

  const [maxPrice,
    setMaxPrice] =
    useState("")



  /* ✅ FETCH PRODUCTS */

  useEffect(() => {

    fetchProducts()

  }, [])



  const fetchProducts =
    async () => {

      try {

        const res =
          await fetch("/api/products")

        const data =
          await res.json()

        setProducts(data)
        setFilteredProducts(data)

        /* ⭐ Dynamic Categories — FIXED */

        const uniqueCategories: string[] = [

          "All",

          ...Array.from(

            new Set<string>(

              data
                .map(
                  (p: any) =>
                    p.category
                )
                .filter(
                  (cat: any) =>
                    typeof cat === "string"
                )

            )

          )

        ]

        setCategories(uniqueCategories)

      }

      catch (error) {

        console.log(
          "Fetch Products Error:",
          error
        )

      }

      finally {

        setLoading(false)

      }

    }



  /* ✅ FILTER + SEARCH + SORT */

  useEffect(() => {

    let updated =
      [...products]



    /* 🔎 SEARCH */

    if (search) {

      updated =
        updated.filter(
          (p) =>
            p.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        )

    }



    /* 🏷 CATEGORY */

    if (category !== "All") {

      updated =
        updated.filter(
          (p) =>
            p.category ===
            category
        )

    }



    /* 💰 PRICE FILTER */

    if (minPrice) {

      updated =
        updated.filter(
          (p) =>
            p.price >=
            Number(minPrice)
        )

    }

    if (maxPrice) {

      updated =
        updated.filter(
          (p) =>
            p.price <=
            Number(maxPrice)
        )

    }



    /* 🔽 SORT */

    if (sort === "low") {

      updated.sort(
        (a, b) =>
          a.price - b.price
      )

    }

    if (sort === "high") {

      updated.sort(
        (a, b) =>
          b.price - a.price
      )

    }



    setFilteredProducts(updated)

  }, [
    search,
    category,
    sort,
    minPrice,
    maxPrice,
    products
  ])



  /* ✅ LOADING */

  if (loading) {

    return (

      <div className="p-10 text-center">

        Loading Products...

      </div>

    )

  }



  return (

    <div className="p-6 md:p-10 max-w-7xl mx-auto">

      {/* ⭐ TITLE */}

      <h1 className="text-3xl font-bold mb-8 text-center">

        Our Products 🛍️

      </h1>



      {/* ⭐ SEARCH + PRICE + SORT */}

      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value)
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
          className="border p-2 rounded"
        />

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="border p-2 rounded"
        >

          <option value="">
            Sort By Price
          </option>

          <option value="low">
            Low → High
          </option>

          <option value="high">
            High → Low
          </option>

        </select>

      </div>



      {/* ⭐ CATEGORY FILTER */}

      <div className="flex gap-2 flex-wrap mb-8">

        {categories.map(
          (cat) => (

            <button
              key={cat}
              onClick={() =>
                setCategory(cat)
              }
              className={`border px-4 py-1 rounded-full text-sm transition ${
                category === cat
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >

              {cat}

            </button>

          )
        )}

      </div>



      {/* ⭐ PRODUCT GRID */}

      {filteredProducts.length === 0 ? (

        <p className="text-center text-gray-500">

          No products found

        </p>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredProducts.map(
            (product) => {

              const image =
                product.images?.[0] ||
                product.image

              const mrp =
                product.mrp || 0

              const price =
                product.price || 0

              const discount =
                mrp
                  ? Math.round(
                      ((mrp - price) / mrp) * 100
                    )
                  : 0

              return (

                <div
                  key={product._id}
                  className="border rounded-xl shadow hover:shadow-lg transition p-3 bg-white relative"
                >

                  {discount > 0 && (

                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">

                      {discount}% OFF

                    </span>

                  )}

                  {product.stock === 0 && (

                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">

                      Out of Stock

                    </span>

                  )}

                  <Link
                    href={`/products/${product._id}`}
                  >

                    <img
                      src={
                        image ||
                        "https://via.placeholder.com/300"
                      }
                      alt={product.name}
                      className="w-full h-64 object-cover rounded hover:scale-105 transition cursor-pointer"
                    />

                  </Link>

                  <h2 className="font-semibold text-md mt-3">

                    {product.name}

                  </h2>

                  <div className="flex items-center gap-2 mt-1">

                    <span className="text-lg font-bold text-pink-600">

                      ₹{price}

                    </span>

                    {mrp > 0 && (

                      <span className="text-sm text-gray-500 line-through">

                        ₹{mrp}

                      </span>

                    )}

                  </div>

                  <Link
                    href={`/products/${product._id}`}
                  >

                    <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">

                      View Details

                    </button>

                  </Link>

                </div>

              )

            }

          )}

        </div>

      )}

    </div>

  )

}