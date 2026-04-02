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

    // 🆔 Generate Unique Order ID

    const orderId =
      "ORD" +
      Date.now()



    // 🟢 Fix Items Structure

    const formattedItems =
      (body.items || []).map(
        (item: any) => ({

          name:
            item.name
            || item.product?.name
            || "Unknown",

          price:
            item.price
            || item.product?.price
            || 0,

          qty:
            item.qty
            || item.quantity
            || 1

        })
      )



    const newOrder =
      new Order({

        orderId,

        name: body.name,
        phone: body.phone,
        address: body.address,
        pincode: body.pincode,

        items: formattedItems,

        total: body.total,

        status: "Pending",

        createdAt: new Date()

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



/* 🟢 GET ALL ORDERS + DASHBOARD STATS */

export async function GET() {

  try {

    await connectDB()



    const orders =
      await Order.find({})
        .sort({ createdAt: -1 })



    /* 📊 CALCULATE STATS */

    const totalOrders =
      orders.length



    const pendingOrders =
      orders.filter(
        o => o.status === "Pending"
      ).length



    const shippedOrders =
      orders.filter(
        o => o.status === "Shipped"
      ).length



    const deliveredOrders =
      orders.filter(
        o => o.status === "Delivered"
      ).length



    const totalRevenue =
      orders.reduce(
        (sum, o) =>
          sum + (o.total || 0),
        0
      )



    /* 📅 TODAY ORDERS */

    const today =
      new Date()

    const todayOrders =
      orders.filter(o => {

        if (!o.createdAt)
          return false

        const d =
          new Date(o.createdAt)

        return (
          d.toDateString() ===
          today.toDateString()
        )

      }).length



    return NextResponse.json({

      orders,

      stats: {

        totalOrders,
        pendingOrders,
        shippedOrders,
        deliveredOrders,
        totalRevenue,
        todayOrders

      }

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



/* 🟢 UPDATE ORDER STATUS */

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



    await Order.findByIdAndUpdate(

      id,

      { status },

      { new: true }

    )



    return NextResponse.json({

      success: true,

      message:
        "Status updated successfully"

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
          "Failed to update status"
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

    const { id } =
      body



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



    await Order.findByIdAndDelete(
      id
    )



    return NextResponse.json({

      success: true,

      message:
        "Order deleted successfully"

    })

  }

  catch (error) {

    console.log(
      "Delete Order Error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete order"
      },
      { status: 500 }
    )

  }

}