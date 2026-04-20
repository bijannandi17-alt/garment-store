export interface CartItem {
  _id: string;

  name: string;

  price: number;

  image: string;

  size: string;

  quantity: number;
}

import { Product } from "./product"

/* 🛒 CART ITEM */

export interface CartItem {
  product: Product

  quantity: number

  selectedSize: string
}