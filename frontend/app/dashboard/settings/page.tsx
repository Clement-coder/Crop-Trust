"use client"

import type React from "react"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Moon, Sun, Bell, Lock, LogOut, Trash2 } from "lucide-react"

interface SettingItemProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

function SettingItem({ icon, title, description, action }: SettingItemProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition">
      <div className="flex items-center gap-4">
        <div className="text-primary text-xl">{icon}</div>
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </div>
  )
}

export default function SettingsPage() {
  const [theme, setTheme] = useState("light")
  const [notifications, setNotifications] = useState({
    email: true,
    orders: true,
    messages: true,
    marketing: false,
  })

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    // In a real app, would apply the theme change
  }

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-4xl">
        <motion.h1
          className="text-3xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Settings
        </motion.h1>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                icon={theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
                title="Theme"
                description={`Currently using ${theme} mode`}
                action={
                  <Button variant="outline" size="sm" onClick={handleThemeToggle}>
                    {theme === "light" ? "Switch to Dark" : "Switch to Light"}
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                icon={<Bell size={24} />}
                title="Email Notifications"
                description="Receive updates via email"
                action={
                  <div
                    className="relative inline-block w-12 h-7 bg-primary rounded-full cursor-pointer"
                    onClick={() => handleNotificationToggle("email")}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.email ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                }
              />
              <SettingItem
                icon={<Bell size={24} />}
                title="Order Updates"
                description="Get notified about new orders"
                action={
                  <div
                    className="relative inline-block w-12 h-7 bg-primary rounded-full cursor-pointer"
                    onClick={() => handleNotificationToggle("orders")}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.orders ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                }
              />
              <SettingItem
                icon={<Bell size={24} />}
                title="Messages"
                description="Notify me of new messages"
                action={
                  <div
                    className="relative inline-block w-12 h-7 bg-primary rounded-full cursor-pointer"
                    onClick={() => handleNotificationToggle("messages")}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.messages ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                }
              />
              <SettingItem
                icon={<Bell size={24} />}
                title="Marketing Emails"
                description="Receive promotional content"
                action={
                  <div
                    className="relative inline-block w-12 h-7 bg-muted rounded-full cursor-pointer"
                    onClick={() => handleNotificationToggle("marketing")}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.marketing ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                }
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                icon={<Lock size={24} />}
                title="Change Password"
                description="Update your account password"
                action={
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                }
              />
              <SettingItem
                icon={<Lock size={24} />}
                title="Two-Factor Authentication"
                description="Add extra security to your account"
                action={
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Account */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                icon={<LogOut size={24} />}
                title="Sign Out"
                description="Sign out of your account"
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      localStorage.removeItem("croptrustUser")
                      window.location.href = "/"
                    }}
                  >
                    Sign Out
                  </Button>
                }
              />
              <SettingItem
                icon={<Trash2 size={24} className="text-destructive" />}
                title="Delete Account"
                description="Permanently delete your account and data"
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
                    onClick={() => alert("This action would delete your account.")}
                  >
                    Delete
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
