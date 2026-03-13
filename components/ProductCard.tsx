import Link from "next/link"

type Props={
id:number
name:string
price:number
image:string
}

export default function ProductCard({id,name,price,image}:Props){

return(

<Link href={`/product/${id}`}>

<div className="border rounded-xl shadow p-4 cursor-pointer">

<img src={image} className="rounded"/>

<h2 className="text-lg mt-2">
{name}
</h2>

<p className="text-pink-600 font-bold">
₹{price}
</p>

</div>

</Link>

)

}