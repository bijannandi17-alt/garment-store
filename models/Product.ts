import mongoose, { Schema, Document, Model } from "mongoose"



/* ⭐ REVIEW INTERFACE */

interface IReview {

  user?: string
  rating?: number
  comment?: string
  createdAt?: Date

}



/* ⭐ PRODUCT INTERFACE */

export interface IProduct extends Document {

  name: string
  price: number

  mrp: number
  discount: number

  category?: string
  description?: string

  material?: string
  fit?: string
  pattern?: string
  washCare?: string
  length?: string

  image?: string
  images: string[]

  sizes: string[]

  sizeStock: Map<string, number>

  stock: number

  rating: number
  reviewCount: number

  reviews: IReview[]

  relatedProducts:
    mongoose.Types.ObjectId[]

}



/* ⭐ REVIEW SCHEMA */

const ReviewSchema =
  new Schema<IReview>(

    {

      user: {
        type: String,
        default: ""
      },

      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
      },

      comment: {
        type: String,
        default: ""
      },

      createdAt: {
        type: Date,
        default: Date.now
      }

    },

    { _id: false }

  )



/* ⭐ PRODUCT SCHEMA */

const ProductSchema =
  new Schema<IProduct>(

    {

      /* BASIC */

      name: {
        type: String,
        required: true
      },

      price: {
        type: Number,
        required: true
      },



      /* ⭐ MRP + DISCOUNT */

      mrp: {
        type: Number,
        default: 0
      },

      discount: {
        type: Number,
        default: 0
      },



      category: {
        type: String,
        default: ""
      },

      description: {
        type: String,
        default: ""
      },



      /* ⭐ PRODUCT SPECIFICATIONS */

      material: {
        type: String,
        default: ""
      },

      fit: {
        type: String,
        default: ""
      },

      pattern: {
        type: String,
        default: ""
      },

      washCare: {
        type: String,
        default: ""
      },

      length: {
        type: String,
        default: ""
      },



      /* ⭐ IMAGES */

      image: {
        type: String,
        default: ""
      },

      images: {
        type: [String],
        default: []
      },



      /* ⭐ SIZE SUPPORT */

      sizes: {
        type: [String],
        default: []
      },



      /* ⭐ SIZE-WISE STOCK */

      sizeStock: {

        type: Map,
        of: Number,
        default: {}

      },



      /* ⭐ INVENTORY */

      stock: {
        type: Number,
        default: 0
      },



      /* ⭐ RATINGS */

      rating: {
        type: Number,
        default: 0
      },

      reviewCount: {
        type: Number,
        default: 0
      },



      /* ⭐ REVIEWS */

      reviews: {
        type: [ReviewSchema],
        default: []
      },



      /* ⭐ RELATED PRODUCTS */

      relatedProducts: [

        {

          type:
            Schema.Types.ObjectId,

          ref: "Product"

        }

      ]

    },

    {

      timestamps: true

    }

  )



/* ⭐ AUTO CALCULATE DISCOUNT (FIXED — NO next() ERROR) */

ProductSchema.pre<IProduct>(

  "save",

  function () {

    if (

      this.mrp > 0 &&
      this.price > 0

    ) {

      this.discount =

        Math.round(

          ((this.mrp - this.price)

            / this.mrp) * 100

        )

    }

  }

)



/* ⭐ FIX MODEL RE-COMPILATION ERROR */

const Product: Model<IProduct> =

  mongoose.models.Product ||

  mongoose.model<IProduct>(
    "Product",
    ProductSchema
  )



export default Product