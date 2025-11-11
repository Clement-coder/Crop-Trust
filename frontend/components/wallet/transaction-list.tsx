"use client"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, CheckCircle, AlertCircle, Clock } from "lucide-react"
import type { TransactionTab } from "./transaction-tabs"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "order_payment" | "order_received"
  description: string
  amount: string
  status: "completed" | "pending" | "failed"
  date: string
  time: string
  reference: string
}

interface TransactionListProps {
  activeTab: TransactionTab
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "order_received",
    description: "Payment received - Tomatoes 50kg",
    amount: "+$25,000",
    status: "completed",
    date: "Today",
    time: "2:30 PM",
    reference: "TXN-20250103-001",
  },
  {
    id: "2",
    type: "deposit",
    description: "Bank transfer deposit",
    amount: "+$50,000",
    status: "completed",
    date: "Today",
    time: "11:15 AM",
    reference: "DEP-20250103-001",
  },
  {
    id: "3",
    type: "order_payment",
    description: "Payment sent - Maize 100kg from Metro Traders",
    amount: "-$45,000",
    status: "completed",
    date: "Yesterday",
    time: "4:45 PM",
    reference: "TXN-20250102-015",
  },
  {
    id: "4",
    type: "withdrawal",
    description: "Bank withdrawal",
    amount: "-$30,000",
    status: "pending",
    date: "Yesterday",
    time: "10:00 AM",
    reference: "WIT-20250102-002",
  },
  {
    id: "5",
    type: "order_received",
    description: "Payment received - Lettuce 20 bundles",
    amount: "+$8,000",
    status: "completed",
    date: "2 days ago",
    time: "3:15 PM",
    reference: "TXN-20250101-008",
  },
  {
    id: "6",
    type: "deposit",
    description: "Bank transfer deposit",
    amount: "+$75,000",
    status: "completed",
    date: "3 days ago",
    time: "9:30 AM",
    reference: "DEP-20241231-005",
  },
  {
    id: "7",
    type: "order_payment",
    description: "Payment sent - Carrots 50kg from Root & Branch",
    amount: "-$35,000",
    status: "failed",
    date: "4 days ago",
    time: "2:00 PM",
    reference: "TXN-20241230-012",
  },
]

const getIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "order_received":
      return <ArrowDownLeft className="w-5 h-5 text-success" />
    case "order_payment":
      return <ArrowUpRight className="w-5 h-5 text-destructive" />
    case "deposit":
      return <ArrowDownLeft className="w-5 h-5 text-success" />
    case "withdrawal":
      return <ArrowUpRight className="w-5 h-5 text-destructive" />
  }
}

const getStatusIcon = (status: Transaction["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-success" />
    case "pending":
      return <Clock className="w-4 h-4 text-warning" />
    case "failed":
      return <AlertCircle className="w-4 h-4 text-destructive" />
  }
}

const filterTransactions = (txns: Transaction[], tab: TransactionTab): Transaction[] => {
  if (tab === "all") return txns
  if (tab === "deposits") return txns.filter((t) => t.type === "deposit")
  if (tab === "withdrawals") return txns.filter((t) => t.type === "withdrawal")
  if (tab === "orders") return txns.filter((t) => t.type === "order_received" || t.type === "order_payment")
  return txns
}

export function TransactionList({ activeTab }: TransactionListProps) {
  const filteredTxns = filterTransactions(transactions, activeTab)

  return (
    <div className="space-y-1">
      {filteredTxns.map((tx, index) => (
        <motion.div
          key={tx.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">{getIcon(tx.type)}</div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{tx.description}</p>
              <div className="flex items-center gap-3">
                <p className="text-xs text-muted-foreground">
                  {tx.date} at {tx.time}
                </p>
                <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">{tx.reference}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className={`font-semibold ${tx.amount.startsWith("+") ? "text-success" : "text-foreground"}`}>
                {tx.amount}
              </p>
              <p
                className={`text-xs capitalize ${
                  tx.status === "completed"
                    ? "text-success"
                    : tx.status === "pending"
                      ? "text-warning"
                      : "text-destructive"
                }`}
              >
                {tx.status}
              </p>
            </div>
            {getStatusIcon(tx.status)}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
