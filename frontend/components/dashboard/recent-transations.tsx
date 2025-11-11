"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

interface Transaction {
  id: number
  crop: string
  buyer: string
  amount: string
  status: "completed" | "pending" | "failed"
  date: string
}

const transactions: Transaction[] = []

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
            <div className="text-center py-8 flex flex-col items-center justify-center">
              <Clock className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg font-medium">No recent transactions</p>
              <p className="text-muted-foreground text-sm mt-1">Your activity will appear here.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
