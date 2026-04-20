import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"



/* 🟢 CREATE ORDER */

export async function POST(
  request: Request
) {

  try {

    await connectDB()

    const body =
      await request.json()

    console.log(
      "Incoming Order Body:",
      body
    )



    /* 🆔 Generate Order ID */

    const orderId =
      "ORD" + Date.now()



    /* 🟢 Validate Fields */

    if (

      !body.customer?.name ||
      !body.customer?.phone ||
      !body.customer?.address ||
      !body.items ||
      body.items.length === 0

    ) {

      return NextResponse.json(

        {

          success: false,
          message:
            "Missing required fields"

        },

        { status: 400 }

      )

    }



    /* 🟢 Format Items */

    const formattedItems =
      body.items.map(
        (item: any) => ({

          name:
            item.product?.name
            || "Unknown",

          price:
            Number(
              item.product?.price
              || 0
            ),

          qty:
            Number(
              item.quantity
              || 1
            ),

          image:
            item.product?.image
            || ""

        })
      )



    /* 🟢 Calculate Total */

    const total =
      formattedItems.reduce(

        (sum: number, item: any) =>

          sum +
          item.price *
          item.qty,

        0

      )



    /* 🟢 Save Order */

    const newOrder =
      new Order({

        orderId,

        name:
          body.customer.name,

        phone:
          body.customer.phone,

        address:
          body.customer.address,

        pincode:
          body.customer.pincode,

        items:
          formattedItems,

        total,

        status:
          "Pending"

      })



    await newOrder.save()



    return NextResponse.json({

      success: true,

      message:
        "Order saved successfully",

      orderId

    })

  }

  catch (error) {

    console.log(
      "Order Save Error:",
      error
    )

    return NextResponse.json(

      {

        success: false,
        message:
          "Failed to save order"

      },

      { status: 500 }

    )

  }

}



/* 🟢 GET ALL ORDERS */

export async function GET() {

  try {

    await connectDB()

    const orders =
      await Order
        .find({})
        .sort({
          createdAt: -1
        })



    return NextResponse.json({

      success: true,

      orders

    })

  }

  catch (error) {

    console.log(
      "Fetch Orders Error:",
      error
    )

    return NextResponse.json(

      {

        success: false,
        message:
          "Failed to fetch orders"

      },

      { status: 500 }

    )

  }

}



/* 🟢 UPDATE STATUS */

export async function PATCH(
  request: Request
) {

  try {

    await connectDB()

    const body =
      await request.json()

    const {
      id,
      status
    } = body



    if (!id || !status) {

      return NextResponse.json(

        {

          success: false,
          message:
            "Missing id or status"

        },

        { status: 400 }

      )

    }



    await Order
      .findByIdAndUpdate(
        id,
        { status }
      )



    return NextResponse.json({

      success: true,

      message:
        "Status updated"

    })

  }

  catch (error) {

    console.log(
      "Status Update Error:",
      error
    )

    return NextResponse.json(

      {

        success: false,
        message:
          "Failed to update"

      },

      { status: 500 }

    )

  }

}



/* 🟢 DELETE ORDER */

export async function DELETE(
  request: Request
) {

  try {

    await connectDB()

    const body =
      await request.json()

    const { id } = body



    if (!id) {

      return NextResponse.json(

        {

          success: false,
          message:
            "Missing order id"

        },

        { status: 400 }

      )

    }



    await Order
      .findByIdAndDelete(id)



    return NextResponse.json({

      success: true,

      message:
        "Order deleted"

    })

  }

  catch (error) {

    console.log(
      "Delete Error:",
      error
    )

    return NextResponse.json(

      {

        success: false,
        message:
          "Failed to delete"

      },

      { status: 500 }

    )

  }

}