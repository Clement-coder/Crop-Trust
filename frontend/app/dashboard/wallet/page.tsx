"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { BalanceCard } from "@/components/wallet/balance-card"
import { TransactionTabs, type TransactionTab } from "@/components/wallet/transaction-tabs"
import { TransactionList } from "@/components/wallet/transaction-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CreditCard, Send, TrendingUp } from "lucide-react"

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<TransactionTab>("all")

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <motion.h1
          className="text-3xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Wallet
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="lg:col-span-2">
            <BalanceCard />
          </div>

          {/* Quick Stats */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">This Month Income</p>
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <p className="text-2xl font-bold text-foreground">₦128,500</p>
                <p className="text-xs text-success mt-1">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Pending Transactions</p>
                  <Send className="w-5 h-5 text-warning" />
                </div>
                <p className="text-2xl font-bold text-foreground">₦45,630</p>
                <p className="text-xs text-muted-foreground mt-1">1 withdrawal in progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <p className="text-lg font-bold text-foreground">Premium Farmer</p>
                <p className="text-xs text-muted-foreground mt-1">Full access to all features</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transaction History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionTabs activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="mt-4">
                <TransactionList activeTab={activeTab} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
