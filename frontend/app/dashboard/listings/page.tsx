"use client"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

const mockListings = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    quantity: "500kg",
    price: "₦8,500/kg",
    status: "active",
    views: 234,
    inquiries: 12,
  },
  {
    id: 2,
    name: "Organic Lettuce",
    quantity: "200 bundles",
    price: "₦3,200/bundle",
    status: "active",
    views: 156,
    inquiries: 8,
  },
  {
    id: 3,
    name: "Premium Carrots",
    quantity: "300kg",
    price: "₦5,000/kg",
    status: "sold out",
    views: 423,
    inquiries: 24,
  },
]

export default function ListingsPage() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            className="text-3xl font-bold text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            My Listings
          </motion.h1>
          <Button>
            <Plus size={18} />
            New Listing
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Views</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Inquiries</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockListings.map((listing, index) => (
                      <motion.tr
                        key={listing.id}
                        className="border-b border-border hover:bg-muted/50 transition"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-4 px-4">{listing.name}</td>
                        <td className="py-4 px-4 text-muted-foreground">{listing.quantity}</td>
                        <td className="py-4 px-4 font-semibold text-primary">{listing.price}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                              listing.status === "active"
                                ? "bg-success/10 text-success"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {listing.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 flex items-center gap-1">
                          <Eye size={16} className="text-muted-foreground" />
                          {listing.views}
                        </td>
                        <td className="py-4 px-4">{listing.inquiries}</td>
                        <td className="py-4 px-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit size={16} />
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
