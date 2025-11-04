"use client"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface OverviewCardProps {
  label: string
  value: string | number
  icon: string
  trend?: "up" | "down" | "neutral"
  change?: string
}

export function OverviewCard({ label, value, icon, trend, change }: OverviewCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{label}</p>
              <p className="text-3xl font-bold text-foreground">{value}</p>
              {change && (
                <p
                  className={`text-xs mt-2 ${
                    trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
                </p>
              )}
            </div>
            <div className="text-4xl">{icon}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
