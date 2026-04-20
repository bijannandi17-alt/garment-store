"use client"

import { useEffect, useState } from "react"

export default function AdminProducts() {

  const [products, setProducts] =
    useState<any[]>([])

  const [name, setName] =
    useState("")

  const [price, setPrice] =
    useState("")

  /* 🟢 NEW PRICE FIELDS */

  const [mrp, setMrp] =
    useState("")

  const [discount, setDiscount] =
    useState("")



  /* 🟢 MULTI IMAGE STATES */

  const [img1, setImg1] =
    useState("")

  const [img2, setImg2] =
    useState("")

  const [img3, setImg3] =
    useState("")

  const [img4, setImg4] =
    useState("")



  const [stock, setStock] =
    useState("")

  const [category, setCategory] =
    useState("")

  const [sizes, setSizes] =
    useState<string[]>([])

  const [description, setDescription] =
    useState("")



  /* 🟢 NEW SPECIFICATION FIELDS */

  const [material, setMaterial] =
    useState("")

  const [fit, setFit] =
    useState("")

  const [pattern, setPattern] =
    useState("")

  const [washCare, setWashCare] =
    useState("")

  const [length, setLength] =
    useState("")



  const [editId, setEditId] =
    useState<string | null>(null)



  useEffect(() => {

    fetchProducts()

  }, [])



  const fetchProducts =
    async () => {

      const res =
        await fetch("/api/products")

      const data =
        await res.json()

      setProducts(data)

    }



  /* SIZE HANDLER */

  const toggleSize =
    (size: string) => {

      if (sizes.includes(size)) {

        setSizes(
          sizes.filter(
            (s) => s !== size
          )
        )

      }

      else {

        setSizes([
          ...sizes,
          size
        ])

      }

    }



  /* ADD / UPDATE */

  const handleAddOrUpdate =
    async () => {

      const images = [

        img1,
        img2,
        img3,
        img4

      ].filter(Boolean)



      const productData = {

        name,

        price: Number(price),

        mrp: Number(mrp),

        discount: Number(discount),

        images,

        image: images[0],

        stock: Number(stock),

        category,

        description,

        sizes,

        material,

        fit,

        pattern,

        washCare,

        length

      }



      if (editId) {

        await fetch(
          "/api/products",
          {

            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              id: editId,

              ...productData

            })

          }
        )

      }

      else {

        await fetch(
          "/api/products",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              productData
            )

          }
        )

      }

      resetForm()

      fetchProducts()

    }



  /* EDIT */

  const handleEdit =
    (p: any) => {

      setEditId(p._id)

      setName(p.name)

      setPrice(p.price)

      setMrp(p.mrp || "")

      setDiscount(p.discount || "")

      setStock(p.stock)

      setCategory(p.category || "")

      setDescription(p.description || "")

      setSizes(p.sizes || [])

      setMaterial(p.material || "")

      setFit(p.fit || "")

      setPattern(p.pattern || "")

      setWashCare(p.washCare || "")

      setLength(p.length || "")



      setImg1(p.images?.[0] || "")

      setImg2(p.images?.[1] || "")

      setImg3(p.images?.[2] || "")

      setImg4(p.images?.[3] || "")

    }



  const resetForm = () => {

    setName("")
    setPrice("")
    setMrp("")
    setDiscount("")
    setImg1("")
    setImg2("")
    setImg3("")
    setImg4("")
    setStock("")
    setCategory("")
    setSizes([])
    setDescription("")
    setMaterial("")
    setFit("")
    setPattern("")
    setWashCare("")
    setLength("")
    setEditId(null)

  }



  /* DELETE */

  const handleDelete =
    async (id: string) => {

      if (confirm("Delete this product?")) {

        await fetch(
          "/api/products",
          {

            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              id
            })

          }
        )

        fetchProducts()

      }

    }



  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">

        Product Management 📦

      </h1>



      {/* FORM */}

      <div className="mb-6 space-y-2">



        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-2 w-full"
        />



        {/* PRICE SECTION */}

        <div className="grid grid-cols-3 gap-2">

          <input
            placeholder="Selling Price"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="border p-2"
          />

          <input
            placeholder="MRP"
            type="number"
            value={mrp}
            onChange={(e) =>
              setMrp(e.target.value)
            }
            className="border p-2"
          />

          <input
            placeholder="Discount %"
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(e.target.value)
            }
            className="border p-2"
          />

        </div>



        {/* IMAGE INPUTS */}

        {/* IMAGE 1 */}

<input
  placeholder="Image 1 URL"
  value={img1}
  onChange={(e)=>setImg1(e.target.value)}
  className="border p-2 w-full"
/>

{img1 && (
  <img
    src={img1}
    alt="Preview 1"
    className="w-32 h-32 object-cover border"
  />
)}



{/* IMAGE 2 */}

<input
  placeholder="Image 2 URL"
  value={img2}
  onChange={(e)=>setImg2(e.target.value)}
  className="border p-2 w-full"
/>

{img2 && (
  <img
    src={img2}
    alt="Preview 2"
    className="w-32 h-32 object-cover border"
  />
)}



{/* IMAGE 3 */}

<input
  placeholder="Image 3 URL"
  value={img3}
  onChange={(e)=>setImg3(e.target.value)}
  className="border p-2 w-full"
/>

{img3 && (
  <img
    src={img3}
    alt="Preview 3"
    className="w-32 h-32 object-cover border"
  />
)}



{/* IMAGE 4 */}

<input
  placeholder="Image 4 URL"
  value={img4}
  onChange={(e)=>setImg4(e.target.value)}
  className="border p-2 w-full"
/>

{img4 && (
  <img
    src={img4}
    alt="Preview 4"
    className="w-32 h-32 object-cover border"
  />
)}


        {/* CATEGORY */}

        <select
          value={category}
          onChange={(e)=>
            setCategory(e.target.value)
          }
          className="border p-2 w-full"
        >

          <option>Select Category</option>

          <option>Kurti</option>
          <option>Saree</option>
          <option>Nighty</option>
          <option>Gown</option>
          <option>Kids Wear</option>

        </select>



        {/* SIZE */}

        <div className="flex gap-2 flex-wrap">

          {["S","M","L","XL","FREE"]
            .map(size => (

              <button
                key={size}
                type="button"
                onClick={()=>toggleSize(size)}
                className={`border px-3 py-1 ${
                  sizes.includes(size)
                    ? "bg-black text-white"
                    : ""
                }`}
              >

                {size}

              </button>

            ))}

        </div>



        {/* SPECIFICATIONS */}

        <input
          placeholder="Material"
          value={material}
          onChange={(e)=>
            setMaterial(e.target.value)
          }
          className="border p-2 w-full"
        />

        <input
          placeholder="Fit"
          value={fit}
          onChange={(e)=>
            setFit(e.target.value)
          }
          className="border p-2 w-full"
        />

        <input
          placeholder="Pattern"
          value={pattern}
          onChange={(e)=>
            setPattern(e.target.value)
          }
          className="border p-2 w-full"
        />

        <input
          placeholder="Wash Care"
          value={washCare}
          onChange={(e)=>
            setWashCare(e.target.value)
          }
          className="border p-2 w-full"
        />

        <input
          placeholder="Length"
          value={length}
          onChange={(e)=>
            setLength(e.target.value)
          }
          className="border p-2 w-full"
        />



        {/* DESCRIPTION */}

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e)=>
            setDescription(e.target.value)
          }
          className="border p-2 w-full"
        />



        <input
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e)=>
            setStock(e.target.value)
          }
          className="border p-2 w-full"
        />



        <button
          onClick={handleAddOrUpdate}
          className="bg-black text-white px-4 py-2 rounded"
        >

          {editId
            ? "Update Product"
            : "Add Product"}

        </button>

      </div>



      {/* PRODUCT LIST */}

      <div>

        {products.map((p) => (

          <div
            key={p._id}
            className="border p-4 mb-2 flex justify-between items-center"
          >

            <div>

              <p>

                {p.name}
                — ₹{p.price}

              </p>

              <p className="text-sm">

                Stock: {p.stock}

              </p>

            </div>



            <div className="space-x-4">

              <button
                onClick={()=>handleEdit(p)}
                className="text-blue-500"
              >

                Edit

              </button>

              <button
                onClick={()=>handleDelete(p._id)}
                className="text-red-500"
              >

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}