"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import { useProducts, type Product } from "./use-products"

export interface CartItem extends Omit<Product, "quantity"> {
  quantity: number // cart-specific quantity
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Product, quantity: number) => void
  removeFromCart: (itemId: string) => void
  updateItemQuantity: (itemId: string, newQuantity: number) => void
  clearCart: () => void
  calculateTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

const LOCAL_STORAGE_KEY = "shopping-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const { updateProductQuantity } = useProducts()
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCartItems = localStorage.getItem(LOCAL_STORAGE_KEY)
      return storedCartItems ? JSON.parse(storedCartItems) : []
    } catch (error) {
      console.error("Failed to load cart items from local storage", error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.error("Failed to save cart items to local storage", error)
    }
  }, [cartItems])

  const addToCart = (item: Product, quantityToAdd: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantityToAdd }
            : i,
        )
      } else {
        return [...prevItems, { ...item, quantity: quantityToAdd }]
      }
    })
    updateProductQuantity(item.id, quantityToAdd)
  }

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    const itemToUpdate = cartItems.find((item) => item.id === itemId)
    if (itemToUpdate) {
      const quantityDifference = newQuantity - itemToUpdate.quantity
      updateProductQuantity(itemId, -quantityDifference)
    }

    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== itemId)
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      )
    })
  }

  const removeFromCart = (itemId: string) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId)
    if (itemToRemove) {
      updateProductQuantity(itemId, -itemToRemove.quantity)
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
  }

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateItemQuantity,
    calculateTotal,
    getCartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
