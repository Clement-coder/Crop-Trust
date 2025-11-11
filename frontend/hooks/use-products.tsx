"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react"
import { useListings, type Listing } from "./use-listings"

export interface Product extends Omit<Listing, "price" | "quantity"> {
  price: number
  quantity: number
  farmer: string
  location: string
  rating: number
  reviews: number
  isOwner: boolean
}

interface ProductContextType {
  products: Product[]
  updateProductQuantity: (productId: string, quantity: number) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const { listings } = useListings()
  const [products, setProducts] = useState<Product[]>([])

  // Placeholder for current user ID - replace with actual user ID from auth context
  const currentUserId = "user-123"

  useEffect(() => {
    const dummyCrops = [
      {
        id: "1",
        name: "Organic Tomatoes",
        farmer: "Farmer John",
        location: "California, USA",
        price: 2.99,
        quantity: 100,
        rating: 4.8,
        reviews: 120,
        image: "/placeholder.svg",
        status: "active",
        ownerId: "farmer-john",
        isOwner: false,
        createdAt: new Date().toISOString(),
        views: 0,
        inquiries: 0,
      },
      {
        id: "2",
        name: "Fresh Carrots",
        farmer: "Farmer Jane",
        location: "Texas, USA",
        price: 1.99,
        quantity: 200,
        rating: 4.7,
        reviews: 90,
        image: "/placeholder.svg",
        status: "active",
        ownerId: "farmer-jane",
        isOwner: false,
        createdAt: new Date().toISOString(),
        views: 0,
        inquiries: 0,
      },
      {
        id: "3",
        name: "Sweet Corn",
        farmer: "Farmer Bob",
        location: "Florida, USA",
        price: 3.49,
        quantity: 150,
        rating: 4.9,
        reviews: 200,
        image: "/placeholder.svg",
        status: "active",
        ownerId: "farmer-bob",
        isOwner: false,
        createdAt: new Date().toISOString(),
        views: 0,
        inquiries: 0,
      },
      {
        id: "4",
        name: "Juicy Strawberries",
        farmer: "Farmer Alice",
        location: "Oregon, USA",
        price: 4.99,
        quantity: 80,
        rating: 4.9,
        reviews: 150,
        image: "/placeholder.svg",
        status: "active",
        ownerId: "farmer-alice",
        isOwner: false,
        createdAt: new Date().toISOString(),
        views: 0,
        inquiries: 0,
      },
      {
        id: "5",
        name: "Crisp Lettuce",
        farmer: "Farmer Charlie",
        location: "Arizona, USA",
        price: 1.49,
        quantity: 300,
        rating: 4.6,
        reviews: 80,
        image: "/placeholder.svg",
        status: "active",
        ownerId: "farmer-charlie",
        isOwner: false,
        createdAt: new Date().toISOString(),
        views: 0,
        inquiries: 0,
      },
      {
        id: "6",
        name: "Blueberries",
        farmer: "Farmer Diana",
        location: "Michigan, USA",
        price: 5.99,
        quantity: 120,
        rating: 4.8,
        reviews: 180,
        image: "/placeholder.svg",
        status: "active",
        ownerId: "farmer-diana",
        isOwner: false,
        createdAt: new Date().toISOString(),
        views: 0,
        inquiries: 0,
      },
      {
        id: "7",
        name: "Bell Peppers",
        farmer: "Farmer Eve",
        location: "New Mexico, USA",
        price: 2.79,
        quantity: 180,
        rating: 4.7,
        reviews: 110,
        image: "/placeholder.svg",
        status: "active",
        ownerId: "farmer-eve",
        isOwner: false,
        createdAt: new Date().toISOString(),
        views: 0,
        inquiries: 0,
      },
    ]

    const combinedProducts = [
      ...dummyCrops,
      ...listings.map((listing) => {
        const ownerId = listing?.ownerId || "" // fallback if undefined
        const isOwner = ownerId === currentUserId

        return {
          ...listing,
          price: parseFloat(listing.price),
          quantity: parseInt(listing.quantity),
          farmer: isOwner
            ? "You"
            : ownerId
            ? `Farmer ${ownerId.slice(-4)}`
            : "Unknown Farmer", // fallback name
          location: "Local",
          rating: 4.5,
          reviews: 100,
          isOwner,
        }
      }),
    ]
    setProducts(combinedProducts)
  }, [listings])

  const updateProductQuantity = (productId: string, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - quantity } : p,
      ),
    )
  }

  const value = {
    products,
    updateProductQuantity,
  }

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}
