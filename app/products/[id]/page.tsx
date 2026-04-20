"use client"

import {
  useState,
  useEffect,
  useContext,
  use
} from "react"

import { CartContext }
  from "../../../lib/cartContext"

import Link from "next/link"

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = use(params)

  const cartContext =
    useContext(CartContext)

  if (!cartContext) {

    return <div>Cart not available</div>

  }

  const { addToCart } =
    cartContext



  const [product, setProduct] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [selectedImage,
    setSelectedImage] =
    useState("")

  const [size,
    setSize] =
    useState("FREE")



  /* ⭐ ZOOM STATE */

  const [zoomStyle,
    setZoomStyle] =
    useState<any>({})



  /* ✅ FETCH PRODUCT */

  useEffect(() => {

    fetchProduct()

  }, [id])



  const fetchProduct =
    async () => {

      try {

        const res =
          await fetch(
            `/api/products/${id}`
          )

        if (!res.ok) {

          setProduct(null)
          return

        }

        const data =
          await res.json()

        setProduct(data)



        const images =

          data.images?.length
            ? data.images
            : [data.image]

        setSelectedImage(
          images[0]
        )

      }

      catch (error) {

        console.log(
          "Fetch Product Error:",
          error
        )

      }

      finally {

        setLoading(false)

      }

    }



  /* ⭐ ZOOM HANDLERS */

  const handleMouseMove =
    (e: any) => {

      const {
        left,
        top,
        width,
        height
      } =
        e.currentTarget
          .getBoundingClientRect()

      const x =
        ((e.clientX - left)
          / width) * 100

      const y =
        ((e.clientY - top)
          / height) * 100

      setZoomStyle({

        transformOrigin:
          `${x}% ${y}%`,

        transform:
          "scale(2)"

      })

    }



  const handleMouseLeave =
    () => {

      setZoomStyle({

        transform:
          "scale(1)"

      })

    }



  if (loading) {

    return (

      <div className="p-10 text-center">

        Loading Product...

      </div>

    )

  }

  if (!product) {

    return (

      <div className="p-10">

        Product not found

      </div>

    )

  }



  /* 🟢 IMAGES */

  const images =

    product.images?.length
      ? product.images
      : [product.image]



  /* 🟢 PRICE */

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

    <div className="p-6 md:p-10">

      <div className="grid md:grid-cols-2 gap-10">

        {/* 🟢 LEFT — IMAGE GALLERY */}

        <div>

          <div

            className="relative overflow-hidden rounded-xl"

            onMouseMove={
              handleMouseMove
            }

            onMouseLeave={
              handleMouseLeave
            }

          >

            <img
              src={
                selectedImage ||
                "https://via.placeholder.com/400"
              }

              alt={product.name}

              className="w-full h-96 object-cover transition-transform duration-200"

              style={zoomStyle}

            />

          </div>



          {/* ⭐ THUMBNAILS */}

          <div className="flex gap-2 mt-4 flex-wrap">

            {images.map(
              (
                img: string,
                index: number
              ) => (

                <img
                  key={`${img}-${index}`}

                  src={img}

                  onClick={() =>
                    setSelectedImage(img)
                  }

                  className={`w-16 h-16 border rounded cursor-pointer object-cover ${
                    selectedImage === img
                      ? "border-pink-600"
                      : "border-gray-300"
                  }`}
                />

              )
            )}

          </div>

        </div>



        {/* 🟢 RIGHT — DETAILS */}

        <div>

          <h1 className="text-3xl font-bold">

            {product.name}

          </h1>



          {/* PRICE */}

          <div className="mt-3 flex items-center gap-3">

            <span className="text-pink-600 text-2xl font-bold">

              ₹{price}

            </span>



            {mrp > 0 && (

              <span className="text-gray-500 line-through">

                ₹{mrp}

              </span>

            )}



            {discount > 0 && (

              <span className="text-green-600 font-semibold">

                ({discount}% OFF)

              </span>

            )}

          </div>



          {/* CATEGORY */}

          {product.category && (

            <p className="text-gray-500 mt-2">

              Category: {product.category}

            </p>

          )}



          {/* DESCRIPTION */}

          {product.description && (

            <p className="text-gray-600 mt-4">

              {product.description}

            </p>

          )}



          {/* SIZE */}

          <div className="mt-6">

            <h2 className="font-bold">

              Select Size

            </h2>

            <div className="flex gap-3 mt-2 flex-wrap">

              {(product.sizes?.length
                ? product.sizes
                : ["FREE"]
              ).map(
                (s: string) => (

                  <button
                    key={s}

                    onClick={() =>
                      setSize(s)
                    }

                    className={`px-4 py-2 border rounded ${
                      size === s
                        ? "bg-pink-600 text-white"
                        : ""
                    }`}
                  >

                    {s}

                  </button>

                )
              )}

            </div>

          </div>



          {/* STOCK */}

          <p className="mt-6 text-sm text-gray-600">

            Stock Available:
            {product.stock}

          </p>



          {/* ADD TO CART */}

          <button

            onClick={() =>
              addToCart({
                ...product,
                selectedSize: size
              })
            }

            className="bg-pink-600 text-white px-6 py-3 mt-6 rounded hover:bg-pink-700"

          >

            Add to Cart 🛒

          </button>



          {/* PRODUCT DETAILS */}

          <div className="mt-10 border-t pt-6">

            <h2 className="font-bold text-lg mb-4">

              Product Details

            </h2>



            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">

              <p>

                <strong>Material:</strong>

                {product.material || "Cotton"}

              </p>

              <p>

                <strong>Pattern:</strong>

                {product.pattern || "Printed"}

              </p>

              <p>

                <strong>Fit:</strong>

                {product.fit || "Regular"}

              </p>

              <p>

                <strong>Wash Care:</strong>

                {product.washCare || "Machine Wash"}

              </p>

              <p>

                <strong>Length:</strong>

                {product.length || "Full Length"}

              </p>

            </div>

          </div>

        </div>

      </div>



      {/* ⭐ RELATED PRODUCTS — FIXED POSITION */}

      {product.relatedProducts?.length > 0 && (

        <div className="mt-16">

          <h2 className="text-2xl font-bold mb-6">

            You May Also Like

          </h2>



          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {product.relatedProducts.map(
              (item: any) => (

                <Link

                  key={item._id}

                  href={`/products/${item._id}`}

                  className="border rounded-xl p-3 hover:shadow-lg transition"

                >

                  <img

                    src={
                      item.images?.[0] ||
                      item.image
                    }

                    alt={item.name}

                    className="w-full h-48 object-cover rounded"

                  />

                  <h3 className="mt-2 font-semibold text-sm">

                    {item.name}

                  </h3>

                  <p className="text-pink-600 font-bold">

                    ₹{item.price}

                  </p>

                </Link>

              )

            )}

          </div>

        </div>

      )}

    </div>

  )

}