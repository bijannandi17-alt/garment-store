"use client"

import { useState } from "react"

export default function ProductGallery({images}:{images:string[]}){

const [main,setMain] = useState(images[0])

return(

<div>

<img
src={main}
className="w-full rounded mb-4"
/>

<div className="flex gap-2">

{images.map((img,i)=>(

<img
key={i}
src={img}
className="w-20 cursor-pointer border"
onClick={()=>setMain(img)}
/>

))}

</div>

</div>

)

}