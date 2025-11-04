"use client"

import { useEffect, useState } from "react"

export interface User {
  name: string
  email: string
  location: string
  role: "farmer" | "buyer"
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("croptrustUser")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        localStorage.removeItem("croptrustUser")
      }
    }
    setIsLoading(false)
  }, [])

  const saveUser = (userData: User) => {
    setUser(userData)
    localStorage.setItem("croptrustUser", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("croptrustUser")
  }

  return { user, isLoading, saveUser, logout }
}
