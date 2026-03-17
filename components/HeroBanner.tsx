"use client"

import { useState, useEffect } from "react"

export default function HeroBanner(){

const banners=[
"/images/banner1.jpg",
"/images/banner2.jpg",
"/images/banner3.jpg",
"/images/banner4.jpg",
"/images/banner5.jpg",
"/images/banner6.jpg",
"/images/banner7.jpg",
"/images/banner8.jpg",
"/images/banner9.jpg",

]

const [index,setIndex]=useState(0)

useEffect(()=>{

const interval=setInterval(()=>{
setIndex((prev)=>(prev+1)%banners.length)
},3000)

return()=>clearInterval(interval)

},[])

return(

<div className="w-full h-[420px] overflow-hidden relative">

<img
src={banners[index]}
className="w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-black/30 flex items-center justify-center">

<h1 className="text-white text-5xl font-bold">
Astylo
</h1>

</div>

</div>

)

}
