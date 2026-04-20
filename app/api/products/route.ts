import { NextResponse } from "next/server"

import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"



/* 🟢 GET PRODUCTS
   Supports:
   - category filter
   - search by name
*/

export async function GET(
  request: Request
) {

  try {

    await connectDB()

    const { searchParams } =
      new URL(request.url)

    const category =
      searchParams.get("category")

    const search =
      searchParams.get("search")

    let query: any = {}



    /* 🟢 FILTER BY CATEGORY */

    if (
      category &&
      category !== "All"
    ) {

      query.category =
        category

    }



    /* 🟢 SEARCH BY NAME */

    if (search) {

      query.name = {

        $regex: search,

        $options: "i"

      }

    }



    const products =
      await Product
        .find(query)
        .sort({
          createdAt: -1
        })



    return NextResponse.json(
      products
    )

  }

  catch (error) {

    console.log(
      "Fetch Products Error:",
      error
    )

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )

  }

}



/* 🟢 ADD PRODUCT */

export async function POST(
  request: Request
) {

  try {

    await connectDB()

    const body =
      await request.json()



    /* 🟢 VALIDATION */

    if (
      !body.name ||
      body.price === undefined
    ) {

      return NextResponse.json(

        {
          success: false,
          message:
            "Name & Price required"
        },

        { status: 400 }

      )

    }



    /* 🟢 HANDLE IMAGES */

    const imagesArray =
      Array.isArray(body.images)
        ? body.images
        : body.image
        ? [body.image]
        : []



    /* 🟢 CREATE PRODUCT */

    const newProduct =
      new Product({

        /* BASIC */

        name:
          body.name || "",

        price:
          Number(body.price) || 0,

        mrp:
          Number(body.mrp) || 0,

        discount:
          Number(body.discount) || 0,

        category:
          body.category || "",

        description:
          body.description || "",



        /* 🟢 SPECIFICATIONS */

        material:
          body.material || "",

        fit:
          body.fit || "",

        pattern:
          body.pattern || "",

        washCare:
          body.washCare || "",

        length:
          body.length || "",



        /* 🟢 SIZE */

        sizes:
          Array.isArray(body.sizes)
            ? body.sizes
            : [],



        /* 🟢 STOCK */

        stock:
          Number(body.stock) || 0,



        /* 🟢 IMAGES */

        image:
          body.image ||
          imagesArray[0] ||
          "",

        images:
          imagesArray

      })



    await newProduct.save()



    return NextResponse.json({

      success: true,

      message:
        "Product added",

      product:
        newProduct

    })

  }

  catch (error) {

    console.log(
      "Add Product Error:",
      error
    )

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )

  }

}



/* 🟡 UPDATE PRODUCT */

export async function PUT(
  request: Request
) {

  try {

    await connectDB()

    const body =
      await request.json()

    const { id, ...data } =
      body



    if (!id) {

      return NextResponse.json(

        {
          success: false,
          message:
            "Product ID required"
        },

        { status: 400 }

      )

    }



    /* 🟢 HANDLE IMAGES */

    if (data.images) {

      data.image =
        data.images[0]

    }



    /* 🟢 SAFE NUMBER CONVERSION */

    if (data.price !== undefined) {

      data.price =
        Number(data.price)

    }

    if (data.mrp !== undefined) {

      data.mrp =
        Number(data.mrp)

    }

    if (data.discount !== undefined) {

      data.discount =
        Number(data.discount)

    }

    if (data.stock !== undefined) {

      data.stock =
        Number(data.stock)

      if (data.stock < 0) {

        data.stock = 0

      }

    }



    const updatedProduct =
      await Product
        .findByIdAndUpdate(

          id,

          data,

          {
            new: true
          }

        )



    return NextResponse.json({

      success: true,

      message:
        "Product updated",

      product:
        updatedProduct

    })

  }

  catch (error) {

    console.log(
      "Update Product Error:",
      error
    )

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )

  }

}



/* 🔴 DELETE PRODUCT */

export async function DELETE(
  request: Request
) {

  try {

    await connectDB()

    const body =
      await request.json()

    const { id } =
      body



    if (!id) {

      return NextResponse.json(

        {
          success: false,
          message:
            "Product ID required"
        },

        { status: 400 }

      )

    }



    await Product
      .findByIdAndDelete(id)



    return NextResponse.json({

      success: true,

      message:
        "Product deleted"

    })

  }

  catch (error) {

    console.log(
      "Delete Product Error:",
      error
    )

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )

  }

}