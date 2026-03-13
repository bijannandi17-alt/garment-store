"use client"

import { useState } from "react"

type Props={
onSearch:(value:string)=>void
}

export default function SearchBar({onSearch}:Props){

const [query,setQuery]=useState("")

function handleSearch(e:any){
const value=e.target.value
setQuery(value)
onSearch(value)
}

return(

<input
type="text"
placeholder="Search nighty..."
value={query}
onChange={handleSearch}
className="border p-3 rounded w-full mb-6"
/>

)

}