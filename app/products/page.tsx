"use client"

import { useState } from "react"
import { products } from "../../data/products"
import ProductCard from "../../components/ProductCard"
import SearchBar from "../../components/SearchBar"

export default function ProductsPage(){

const [filtered,setFiltered]=useState(products)

function handleSearch(query:string){

const result=products.filter(p =>
p.name.toLowerCase().includes(query.toLowerCase())
)

setFiltered(result)

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Nighty Collection
</h1>

<SearchBar onSearch={handleSearch}/>

<div className="grid grid-cols-4 gap-6">

{filtered.map(p=>(

<ProductCard
key={p.id}
id={p.id}
name={p.name}
price={p.price}
image={p.image}
/>

))}

</div>

</div>

)

}