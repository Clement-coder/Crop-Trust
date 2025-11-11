import { useState, useEffect } from "react"
import { Listing } from "./use-listings"

export interface CartItem extends Omit<Listing, "quantity"> {
  quantity: number // cart-specific quantity
}


const LOCAL_STORAGE_KEY = "shopping-cart"

export function useCart() {
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

  const addToCart = (item: Listing, quantityToAdd: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantityToAdd }
            : i
        )
      } else {
        return [...prevItems, { ...item, quantity: quantityToAdd }]
      }
    })
  }

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== itemId)
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    })
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return { cartItems, addToCart, removeFromCart, clearCart, updateItemQuantity, calculateTotal, getCartCount }
}
