import Link from "next/link"
<Link href="/products">Products</Link>

export default function Navbar() {
  return (
      <nav className="flex justify-between p-4 bg-pink-600 text-white">
      <h1 className="text-xl font-bold">Amropali Fashon</h1>

      <div className="space-x-4">
        <a href="/">Home</a>
        <a href="/products">Nighty</a>
        <a href="/contact">Contact</a>
        <a href="/cart">Cart</a>
      </div>
    </nav>
  );
}