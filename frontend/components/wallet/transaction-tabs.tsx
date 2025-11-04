"use client"
import { motion } from "framer-motion"

export type TransactionTab = "all" | "deposits" | "withdrawals" | "orders"

interface TransactionTabsProps {
  activeTab: TransactionTab
  onTabChange: (tab: TransactionTab) => void
}

const tabs = [
  { id: "all" as const, label: "All Transactions", count: 24 },
  { id: "deposits" as const, label: "Deposits", count: 8 },
  { id: "withdrawals" as const, label: "Withdrawals", count: 5 },
  { id: "orders" as const, label: "Orders", count: 11 },
]

export function TransactionTabs({ activeTab, onTabChange }: TransactionTabsProps) {
  return (
    <div className="flex gap-1 border-b border-border overflow-x-auto">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
            activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ color: "#4C7F45" }}
        >
          {tab.label}
          <span
            className={`ml-2 text-xs px-2 py-1 rounded-full ${
              activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            }`}
          >
            {tab.count}
          </span>
          {activeTab === tab.id && (
            <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" layoutId="activeTab" />
          )}
        </motion.button>
      ))}
    </div>
  )
}
