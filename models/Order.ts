import mongoose from "mongoose"

const OrderSchema =
  new mongoose.Schema(
    {

      orderId: {
        type: String,
        required: true,
      },

      name: {
        type: String,
      },

      phone: {
        type: String,
      },

      address: {
        type: String,
      },

      pincode: {
        type: String,
      },

      items: [

        {

          name: String,

          price: Number,

          qty: Number,

        }

      ],

      total: Number,

      status: {

        type: String,

        default: "Pending",

      }

    },

    {

      timestamps: true // ⭐ gives createdAt & updatedAt

    }

  )

export default
  mongoose.models.Order ||
  mongoose.model(
    "Order",
    OrderSchema
  )