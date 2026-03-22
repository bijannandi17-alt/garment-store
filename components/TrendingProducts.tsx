import { products } from "../data/products"
import ProductCard from "./ProductCard"

export default function TrendingProducts() {

const trending = products.slice(0,3)

return(

<div className="p-10">

<h2 className="text-3xl font-bold mb-6">
Trending Nighty
</h2>

<div className="grid grid-cols-3 gap-6">

{trending.map(p => (

<ProductCard
  id={p.id}
  name={p.name}
  price={p.price}
  oldPrice={p.oldPrice}
  image={p.image[0]}     // ✅ FIX
  hoverImage={p.hoverImage}
/>

))}

</div>

</div>

)

}