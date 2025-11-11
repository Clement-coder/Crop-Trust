import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ShoppingCart, MessageCircle, Star, MapPin, Scale, User, Calendar, Clock, Check } from "lucide-react" // Added Calendar icon
import { useState } from "react"
import { Listing } from "@/hooks/use-listings"
import Image from "next/image"

interface CropCardProps {
  id: string
  name: string
  farmer: string
  location: string
  price: string
  quantity: string
  rating: number
  reviews: number
  image: string
  inStock: boolean
  addToCart: (item: Listing, quantityInCart: number) => void
  handleContactClick: (farmer: string, crop: string) => void
  isOwner: boolean
  createdAt: string // Added createdAt prop
}

export function CropCard({ id, name, farmer, location, price, quantity, rating, reviews, image, inStock, addToCart, handleContactClick, isOwner, createdAt }: CropCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _id = id
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    // Simulate API call or async operation
    setTimeout(() => {
      addToCart({ id, name, price, quantity, status: inStock ? "active" : "sold out", views: 0, inquiries: 0, image, ownerId: "", createdAt: createdAt }, 1) // Pass 1 as default quantity, ownerId is placeholder
      setIsAddingToCart(false)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }, 500)
  }

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
  const formattedTime = new Date(createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Image */}
        <div className="w-full h-48 relative overflow-hidden">
          {image ? (
            <Image src={image} alt={name} layout="fill" objectFit="cover" className="rounded-md" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <span className="text-5xl">🌾</span>
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white font-semibold">Out of Stock</p>
            </div>
          )}
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-foreground mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin size={14} /> {location}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <User size={14} /> By: {farmer}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar size={14} /> Listed: {formattedDate} <Clock size={14} /> {formattedTime}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(rating) ? "fill-warning text-warning" : "text-muted"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>

          {/* Quantity and Price */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Scale size={14} /> Available: {quantity}
            </p>
            <p className="text-2xl font-bold text-primary">${price}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <Button
              className="flex-1"
              size="sm"
              disabled={!inStock || isAddingToCart || addedToCart || isOwner} // Disable if isOwner
              onClick={handleAddToCart}
            >
              {isAddingToCart ? (
                "Adding..."
              ) : addedToCart ? (
                <>
                  <Check size={16} /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Add to Cart
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => handleContactClick(farmer, name)}>
              <MessageCircle size={16} />
              Contact
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
