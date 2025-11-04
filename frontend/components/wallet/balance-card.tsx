"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Eye, EyeOff, Copy } from "lucide-react"

export function BalanceCard() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm opacity-80 mb-2">Total Balance</p>
              <div className="flex items-end gap-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-bold">{isVisible ? "₦245,630" : "••••••"}</h2>
                  <span className="text-lg opacity-90">.50</span>
                </div>
                <button
                  onClick={() => setIsVisible(!isVisible)}
                  className="opacity-80 hover:opacity-100 transition mb-1"
                >
                  {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Deposit Funds
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-white/10 bg-transparent"
              >
                Withdraw
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-white/10 bg-transparent"
              >
                <Copy size={16} />
                Account ID
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/30">
              <div>
                <p className="text-xs opacity-80">Available</p>
                <p className="text-xl font-semibold">{isVisible ? "₦200,000" : "•••••"}</p>
              </div>
              <div>
                <p className="text-xs opacity-80">On Hold</p>
                <p className="text-xl font-semibold">{isVisible ? "₦45,630" : "•••••"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
