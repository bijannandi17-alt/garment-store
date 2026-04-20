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
  createContext<
    CartContextType | undefined
  >(undefined);

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

      setCart(
        JSON.parse(savedCart)
      );

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

    setCart(prev => {

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

      /* Ensure images exist */

      const safeProduct: Product = {

        ...product,

        images:
          product.images?.length > 0
            ? product.images
            : ["/placeholder.png"]

      };

      return [

        ...prev,

        {

          product: safeProduct,

          quantity: 1,

          selectedSize: size

        }

      ];

    });

  };

  /* 🟢 INCREASE */

  const increaseQty = (

    id: string,

    size?: string

  ) => {

    setCart(prev =>

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

    setCart(prev =>

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

    setCart(prev =>

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