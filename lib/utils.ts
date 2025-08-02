import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `QAR ${price.toLocaleString()}`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-QA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function getStockStatus(stock: number): {
  status: "in-stock" | "low-stock" | "out-of-stock"
  color: string
  text: string
} {
  if (stock === 0) {
    return { status: "out-of-stock", color: "text-red-600", text: "Out of Stock" }
  }
  if (stock <= 3) {
    return { status: "low-stock", color: "text-orange-600", text: "Low Stock" }
  }
  return { status: "in-stock", color: "text-green-600", text: "In Stock" }
}
