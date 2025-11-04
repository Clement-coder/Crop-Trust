"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ShoppingCart, MessageCircle, Star } from "lucide-react"

interface CropCardProps {
  id: number
  name: string
  farmer: string
  location: string
  price: string
  quantity: string
  rating: number
  reviews: number
  image: string
  inStock: boolean
}

export function CropCard({ id, name, farmer, location, price, quantity, rating, reviews, inStock }: CropCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Image placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
          <div className="text-5xl">🌾</div>
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
            <p className="text-sm text-muted-foreground">{farmer}</p>
            <p className="text-xs text-muted-foreground">{location}</p>
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
            <p className="text-xs text-muted-foreground mb-1">Available: {quantity}</p>
            <p className="text-2xl font-bold text-primary">{price}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <Button className="flex-1" size="sm" disabled={!inStock}>
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <MessageCircle size={16} />
              Contact
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
