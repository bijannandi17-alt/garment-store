"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function HeroBanner() {

  const banners = [
    "/images/banner1_new.jpg",
"/images/banner2.jpg",
"/images/banner3.jpg",
"/images/banner4.jpg",
"/images/banner5.jpg",
"/images/banner6.jpg",
"/images/banner7.jpg",
"/images/banner8.jpg",
"/images/banner9.jpg"
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (

    <div className="w-full h-[60vh] md:h-[80vh] relative">

      {/* Banner Image */}
      

      <Image
  src={banners[index]}
  alt="banner"
  fill
  priority
  className="object-cover"
/>      


      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">

        <h1 className="text-white text-3xl md:text-6xl font-bold">
          AstylO
        </h1>

        <p className="text-white mt-4 text-lg md:text-xl">
          Stylish & Comfortable Nighties
        </p>

      </div>

    </div>

  )
}
