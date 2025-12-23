import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { createCategory, fetchCategories, removeCategory } from '../store/categoriesSlice'

const CategoriesPage = () => {
  const dispatch = useAppDispatch()
  const { categories, status } = useAppSelector((state) => state.categories)
  const [newCategoryName, setNewCategoryName] = useState('')

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories())
    }
  }, [dispatch, status])

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategoryName.trim()) {
      dispatch(createCategory({ name: newCategoryName.trim() }))
      setNewCategoryName('')
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      dispatch(removeCategory(id))
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Category Management</h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Manage your clothing categories (Crop Top, Blouse, T-Shirt, etc.)
        </p>
      </div>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name..."
          className="flex-1 rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          style={{ fontSize: '16px' }}
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 sm:px-6 py-2 text-sm sm:text-base font-medium text-white hover:bg-blue-700 active:scale-95 transition-transform"
        >
          Add Category
        </button>
      </form>

      {/* Categories List */}
      <div className="space-y-2">
        {status === 'loading' && <p className="text-center text-gray-500 py-6">Loading categories...</p>}
        {status !== 'loading' && categories.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No categories yet. Add your first category!</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">{category.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Added: {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(category.id)}
                className="rounded-lg bg-red-50 px-4 py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-100 active:scale-95 transition-transform"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="rounded-lg bg-blue-50 p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-blue-800">
          <strong>Total Categories:</strong> {categories.length}
        </p>
      </div>
    </div>
  )
}

export default CategoriesPage

