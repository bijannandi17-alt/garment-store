"use client";

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext
} from "react";

/* 🟢 TYPES */

import { Product } from "@/types/product";
import { CartItem } from "@/types/cart";

/* 🟢 CONTEXT TYPE */

type CartContextType = {
  cart: CartItem[];

  addToCart: (
    product: Product,
    size?: string
  ) => void;

  increaseQty: (
    id: string,
    size?: string
  ) => void;

  decreaseQty: (
    id: string,
    size?: string
  ) => void;

  removeItem: (
    id: string,
    size?: string
  ) => void;

  clearCart: () => void;
};

/* 🟢 CREATE CONTEXT */

export const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

/* 🟢 PROVIDER */

export function CartProvider({
  children
}: {
  children: ReactNode;
}) {

  const [cart, setCart] =
    useState<CartItem[]>([]);

  /* 🟢 LOAD CART */

  useEffect(() => {

    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {

      try {

        setCart(
          JSON.parse(savedCart)
        );

      } catch {

        setCart([]);

      }

    }

  }, []);

  /* 🟢 SAVE CART */

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  /* 🟢 ADD TO CART */

  const addToCart = (
    product: Product,
    size = "Free Size"
  ) => {

    setCart((prev: CartItem[]) => {

      const existing =
        prev.find(

          item =>

            item.product._id ===
              product._id &&

            item.selectedSize ===
              size

        );

      /* If already exists */

      if (existing) {

        return prev.map(item =>

          item.product._id ===
            product._id &&

          item.selectedSize === size

            ? {

                ...item,

                quantity:
                  item.quantity + 1

              }

            : item

        );

      }

      /* Safe Product */

      const safeProduct: Product = {

        _id: product._id,

        name: product.name,

        price: product.price,

        mrp:
          product.mrp ??
          product.price,

        category:
          product.category ??
          "General",

        images:
          product.images?.length > 0
            ? product.images
            : ["/placeholder.png"],

        stock:
          product.stock ?? 1

      };

      /* Return New Cart */

      return [

        ...prev,

        {

          _id: safeProduct._id,

          name: safeProduct.name,

          price: safeProduct.price,

          image: safeProduct.images?.[0] ?? "/placeholder.png",

          size: size,

          quantity: 1,

          selectedSize: size,

          product: safeProduct

        }

      ];

    });

  };

  /* 🟢 INCREASE */

  const increaseQty = (
    id: string,
    size?: string
  ) => {

    setCart((prev: CartItem[]) =>

      prev.map(item =>

        item.product._id === id &&
        item.selectedSize === size

          ? {

              ...item,

              quantity:
                item.quantity + 1

            }

          : item

      )

    );

  };

  /* 🟢 DECREASE */

  const decreaseQty = (
    id: string,
    size?: string
  ) => {

    setCart((prev: CartItem[]) =>

      prev

        .map(item =>

          item.product._id === id &&
          item.selectedSize === size

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

    );

  };

  /* 🟢 REMOVE */

  const removeItem = (
    id: string,
    size?: string
  ) => {

    setCart((prev: CartItem[]) =>

      prev.filter(

        item =>

          !(
            item.product._id === id &&
            item.selectedSize === size
          )

      )

    );

  };

  /* 🧹 CLEAR */

  const clearCart = () => {

    setCart([]);

    localStorage.removeItem("cart");

  };

  return (

    <CartContext.Provider

      value={{

        cart,

        addToCart,

        increaseQty,

        decreaseQty,

        removeItem,

        clearCart

      }}

    >

      {children}

    </CartContext.Provider>

  );

}

/* 🟢 CUSTOM HOOK */

export const useCart = () => {

  const context =
    useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );

  }

  return context;

};