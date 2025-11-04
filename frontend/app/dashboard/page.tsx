"use client"
import { DashboardLayout } from "@/components/dashboard/layout"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { RecentTransactions } from "@/components/dashboard/recent-transations"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <motion.h1
          className="text-3xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Dashboard Overview
        </motion.h1>

        {/* Overview Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <OverviewCard label="Total Listings" value={12} icon="📋" trend="up" change="2 this month" />
          <OverviewCard label="Active Orders" value={5} icon="📦" trend="neutral" change="Ongoing" />
          <OverviewCard label="Total Earnings" value="₦245,000" icon="💰" trend="up" change="18% increase" />
          <OverviewCard label="Trust Score" value="4.8/5" icon="⭐" trend="up" change="Excellent" />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <RecentTransactions />
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
