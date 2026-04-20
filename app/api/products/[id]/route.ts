import { NextResponse } from "next/server"

import dbConnect from "@/lib/dbConnect"
import Product from "@/models/Product"


export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    await dbConnect()

    const { id } =
      await context.params



    const product =
      await Product.findById(id)

    if (!product) {

      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )

    }



    const relatedProducts =
      await Product.find({

        category:
          product.category,

        _id: {
          $ne: product._id
        }

      })
      .limit(4)



    return NextResponse.json({

      ...product.toObject(),

      relatedProducts

    })

  }

  catch (error) {

    console.log(
      "Fetch Product Error:",
      error
    )

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    )

  }

}