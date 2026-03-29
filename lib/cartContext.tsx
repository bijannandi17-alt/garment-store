"use client"

import {
  createContext,
  useState,
  ReactNode,
  useEffect
} from "react"

export type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string[]
  hoverImage?: string
}

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

  clearCart: () => void   // 🆕 NEW
}

export const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  )

export function CartProvider({
  children
}: {
  children: ReactNode
}) {

  const [cart, setCart] =
    useState<CartItem[]>([])

  // 🟢 LOAD CART FROM STORAGE
  useEffect(() => {

    const savedCart =
      localStorage.getItem("cart")

    if (savedCart) {

      setCart(JSON.parse(savedCart))

    }

  }, [])

  // 🟢 SAVE CART TO STORAGE
  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    )

  }, [cart])

  // 🟢 ADD TO CART
  const addToCart = (product: Product) => {

    setCart(prev => {

      const existing = prev.find(
        item =>
          item.product.id === product.id
      )

      if (existing) {

        return prev.map(item =>
          item.product.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
        )

      }

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
              quantity:
                item.quantity + 1
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
                quantity:
                  item.quantity - 1
              }
            : item
        )
        .filter(
          item => item.quantity > 0
        )
    )

  }

  // 🟢 REMOVE ITEM
  const removeItem = (id: number) => {

    setCart(prev =>
      prev.filter(
        item =>
          item.product.id !== id
      )
    )

  }

  // 🧹 CLEAR CART (VERY IMPORTANT)
  const clearCart = () => {

    setCart([])

    localStorage.removeItem("cart")

  }

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart   // ✅ Added
      }}
    >

      {children}

    </CartContext.Provider>

  )

}