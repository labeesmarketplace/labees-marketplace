"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  size: string
  color: string
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color,
      )

      if (existingItem) {
        return prev.map((item) =>
          item.id === existingItem.id && item.size === existingItem.size && item.color === existingItem.color
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...prev, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(id)
      return
    }

    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
