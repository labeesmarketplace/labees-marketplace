import React from "react"

interface Category {
  name: string
}

interface CategoryDesignerGridProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onFeaturedDesigners?: () => void
  onDesignersAZ?: () => void
  onSaleClick?: () => void
}

const CategoryDesignerGrid: React.FC<CategoryDesignerGridProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onFeaturedDesigners,
  onDesignersAZ,
  onSaleClick,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
          SHOP BY CATEGORY
        </h2>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-teal-100">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.name
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
                  : "bg-teal-50 text-teal-700 hover:bg-teal-100"
              }`}
            >
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-teal-100">
          <h3 className="font-bold text-teal-700 mb-4 text-lg">By Designer</h3>
          <div className="flex space-x-4">
            <button
              className="px-6 py-3 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 transition-all duration-300 hover:scale-105 font-medium"
              onClick={onFeaturedDesigners}
            >
              Featured Designers
            </button>
            <button
              className="px-6 py-3 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 transition-all duration-300 hover:scale-105 font-medium"
              onClick={onDesignersAZ}
            >
              Designers A-Z
            </button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-teal-100">
          <button
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={onSaleClick}
          >
            🔥 SALE - Up to 70% OFF
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryDesignerGrid