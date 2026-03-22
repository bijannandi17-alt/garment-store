"use client"

import { useState } from "react"
import { products } from "../../data/products"
import ProductCard from "../../components/ProductCard"

export default function ProductsPage() {

  const [maxPrice, setMaxPrice] = useState(2000)
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")

  // FILTER LOGIC
  let filteredProducts = products.filter(p =>
    p.price <= maxPrice &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  // SORT LOGIC
  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  }

  return (

    <div className="grid grid-cols-4 gap-6 p-6">

      {/* LEFT SIDE FILTERS */}
      <div className="border p-4 rounded-lg">

        <h2 className="font-bold text-lg mb-4">Filters</h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        {/* PRICE FILTER */}
        <label className="block mb-2">
          Max Price: ₹{maxPrice}
        </label>

        <input
          type="range"
          min="0"
          max="2000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />

        {/* SORT */}
        <h2 className="font-bold mt-6">Sort By</h2>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 w-full mt-2 rounded"
        >
          <option value="">Default</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

      </div>

      {/* RIGHT SIDE PRODUCTS */}
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">

        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              image={product.image[0]}  // ✅ FIXED: image → not images
              hoverImage={product.hoverImage}
            />
          ))
        ) : (
          <p>No products found</p>
        )}

      </div>

    </div>
  )
}