import React from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface ProductFilterBarProps {
  categories: string[]
  designers: string[]
  selectedCategory: string
  selectedDesigner: string
  onCategoryChange: (category: string) => void
  onDesignerChange: (designer: string) => void
}

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  categories,
  designers,
  selectedCategory,
  selectedDesigner,
  onCategoryChange,
  onDesignerChange,
}) => {
  return (
    <div className="w-full bg-white border-b card-shadow sticky top-0 z-30">
      <div className="flex items-center px-4 py-2 space-x-6 overflow-x-auto scrollbar-hide">
        {/* Categories */}
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "ghost"}
            className={`whitespace-nowrap text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 ${selectedCategory === cat ? "bg-[#003153] text-white" : "text-[#003153] border border-[#003153] bg-white hover:bg-[#003153]/10"}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </Button>
        ))}
        {/* Designers Dropdown */}
        <select
          className="ml-4 px-3 py-2 border border-gray-300 rounded-full text-sm text-[#003153] bg-white focus:outline-none focus:ring-2 focus:ring-[#003153]"
          value={selectedDesigner}
          onChange={(e) => onDesignerChange(e.target.value)}
        >
          <option value="">All Designers</option>
          {designers.map((designer) => (
            <option key={designer} value={designer}>
              {designer}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductFilterBar