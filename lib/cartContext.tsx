"use client"

import { createContext, useState, ReactNode } from "react"

export type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string[]
  hoverImage?: string
}

// 🟢 NEW Cart Item Type
export type CartItem = {
  product: Product
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  removeItem: (id: number) => void
}

export const CartContext =
  createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {

  const [cart, setCart] = useState<CartItem[]>([])

  // 🟢 ADD TO CART
  const addToCart = (product: Product) => {

    setCart(prev => {

      const existing = prev.find(
        item => item.product.id === product.id
      )

      // If exists → increase quantity
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      }

      // If new → add item
      return [
        ...prev,
        {
          product,
          quantity: 1
        }
      ]

    })

  }

  // 🟢 INCREASE
  const increaseQty = (id: number) => {

    setCart(prev =>
      prev.map(item =>
        item.product.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )

  }

  // 🟢 DECREASE
  const decreaseQty = (id: number) => {

    setCart(prev =>
      prev
        .map(item =>
          item.product.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter(item => item.quantity > 0)
    )

  }

  // 🟢 REMOVE
  const removeItem = (id: number) => {

    setCart(prev =>
      prev.filter(
        item => item.product.id !== id
      )
    )

  }

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem
      }}
    >

      {children}

    </CartContext.Provider>

  )

}