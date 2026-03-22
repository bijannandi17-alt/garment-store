export type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  images: string[]
}

export const products = [
  {
    id: 1,
    name: "Cotton Nighty Floral",
    price: 499,
    oldPrice: 999,
    image: [
      "/images/nighty1.jpg",
      "/images/nighty1b.jpg",
      "/images/nighty1c.jpg",
      "/images/nighty1d.jpg"
    ],
    hoverImage: "/images/nighty1b.jpg"
  },
  {
    id: 2,
    name: "Printed Cotton Nighty",
    price: 549,
    oldPrice: 1099,
    image: [
      "/images/nighty2.jpg",
      "/images/nighty2b.jpg",
      "/images/nighty2c.jpg",
      "/images/nighty2d.jpg"
    ],
    hoverImage: "/images/nighty2b.jpg"
  },
  {
    id: 3,
    name: "Soft Rayon Nighty",
    price: 599,
    oldPrice: 1199,
    image: [
      "/images/nighty3.jpg",
      "/images/nighty3b.jpg",
      "/images/nighty3c.jpg",
      "/images/nighty3d.jpg"
    ],
    hoverImage: "/images/nighty3b.jpg"
  },
  {
    id: 4,
    name: "Daily Wear Nighty",
    price: 459,
    oldPrice: 899,
    image: [
      "/images/nighty4.jpg",
      "/images/nighty4b.jpg",
      "/images/nighty4c.jpg",
      "/images/nighty4d.jpg"
    ],
    hoverImage: "/images/nighty4b.jpg"
  },
]
