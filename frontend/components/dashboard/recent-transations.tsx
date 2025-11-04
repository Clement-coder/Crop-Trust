"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

const transactions = [
  {
    id: 1,
    crop: "Tomatoes - 50kg",
    buyer: "John Restaurants Ltd",
    amount: "₦25,000",
    status: "completed",
    date: "Today, 2:30 PM",
  },
  {
    id: 2,
    crop: "Maize - 100kg",
    buyer: "Metro Agro Traders",
    amount: "₦45,000",
    status: "pending",
    date: "Yesterday, 10:15 AM",
  },
  {
    id: 3,
    crop: "Lettuce - 20kg",
    buyer: "Fresh Market Co",
    amount: "₦8,000",
    status: "completed",
    date: "2 days ago",
  },
]

export function RecentTransactions() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-success" />
      case "pending":
        return <Clock className="w-5 h-5 text-warning" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{tx.crop}</p>
                  <p className="text-xs text-muted-foreground">{tx.buyer}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-primary">{tx.amount}</p>
                  {getStatusIcon(tx.status)}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
