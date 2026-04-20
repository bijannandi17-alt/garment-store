import mongoose from "mongoose"

/* 🟢 Order Item Schema */

const OrderItemSchema =
  new mongoose.Schema({

    name: {
      type: String
    },

    price: {
      type: Number
    },

    qty: {
      type: Number
    },

    image: {
      type: String,
      default: ""
    }

  })


/* 🟢 Main Order Schema */

const OrderSchema =
  new mongoose.Schema(

    {

      orderId: {
        type: String,
        required: true
      },

      name: String,

      phone: String,

      address: String,

      pincode: String,

      items: [
        OrderItemSchema
      ],

      total: Number,

      status: {

        type: String,

        default: "Pending"

      }

    },

    {

      timestamps: true // ⭐ createdAt & updatedAt

    }

  )


export default
  mongoose.models.Order ||
  mongoose.model(
    "Order",
    OrderSchema
  )