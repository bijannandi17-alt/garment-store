export interface SizeStock {
  size: string
  stock: number
}

export interface Product {

  _id: string   // MongoDB ID

  name: string

  price: number

  mrp: number

  discount?: number

  category: string

  description?: string

  material?: string

  fit?: string

  pattern?: string

  washCare?: string

  length?: string

  images: string[]

  sizeStock?: SizeStock[]

  stock: number

  relatedProducts?: string[]

  createdAt?: string

  updatedAt?: string

}