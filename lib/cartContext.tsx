"use client"

import { createContext, useState, ReactNode } from "react"

export type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string[]     // ✅ FIXED
  hoverImage: string
}

type CartContextType = {
  cart: Product[]
  addToCart: (product: Product) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {

  const [cart, setCart] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    console.log("Adding to cart:", product)
    setCart(prev => [...prev, product])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}