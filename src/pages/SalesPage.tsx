import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { createSale, fetchSales, removeSale } from '../store/salesSlice'
import { fetchCategories } from '../store/categoriesSlice'
import { fetchPurchases } from '../store/purchasesSlice'

const SalesPage = () => {
  const dispatch = useAppDispatch()
  const { categories, status: categoriesStatus } = useAppSelector((state) => state.categories)
  const { sales, status: salesStatus } = useAppSelector((state) => state.sales)
  const { purchases, status: purchasesStatus } = useAppSelector((state) => state.purchases)

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    categoryId: '',
    quantity: '',
    sellingPricePerItem: '',
  })

  useEffect(() => {
    if (categoriesStatus === 'idle') dispatch(fetchCategories())
    if (purchasesStatus === 'idle') dispatch(fetchPurchases())
    if (salesStatus === 'idle') dispatch(fetchSales())
  }, [dispatch, categoriesStatus, purchasesStatus, salesStatus])

  // Get available stock for selected category
  const getAvailableStock = (categoryId: string) => {
    const totalPurchased = purchases
      .filter((p) => p.categoryId === categoryId)
      .reduce((sum, p) => sum + p.quantity, 0)

    const totalSold = sales
      .filter((s) => s.categoryId === categoryId)
      .reduce((sum, s) => sum + s.quantity, 0)

    return totalPurchased - totalSold
  }

  const selectedCategoryStock = formData.categoryId ? getAvailableStock(formData.categoryId) : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.categoryId || !formData.quantity || !formData.sellingPricePerItem) {
      alert('Please fill in all required fields')
      return
    }

    const quantity = Number(formData.quantity)
    const availableStock = getAvailableStock(formData.categoryId)

    if (quantity > availableStock) {
      alert(`Only ${availableStock} items available in stock!`)
      return
    }

    const category = categories.find((c) => c.id === formData.categoryId)
    if (!category) return

    dispatch(
      createSale({
        date: formData.date,
        categoryId: formData.categoryId,
        categoryName: category.name,
        quantity,
        sellingPricePerItem: Number(formData.sellingPricePerItem),
      })
    )

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      categoryId: '',
      quantity: '',
      sellingPricePerItem: '',
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this sale record?')) {
      dispatch(removeSale(id))
    }
  }

  const totalSalesValue = sales.reduce((sum, s) => sum + s.totalAmount, 0)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Sales Entry</h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Record daily sales (stock going out)</p>
      </div>

      {/* Sales Form */}
      <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 p-4 sm:p-5 lg:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 sm:px-4 py-2 sm:py-3 text-base placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none"
              style={{ fontSize: '16px' }}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">Category *</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 sm:px-4 py-2 sm:py-3 text-base placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none"
              style={{ fontSize: '16px' }}
              required
              disabled={categoriesStatus === 'loading' || categories.length === 0}
            >
              <option value="">
                {categoriesStatus === 'loading' ? 'Loading categories...' : 'Select category...'}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} (Stock: {getAvailableStock(cat.id)})
                </option>
              ))}
            </select>
            {categoriesStatus !== 'loading' && categories.length === 0 && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">No categories found. Add a category first.</p>
            )}
            {categoriesStatus === 'failed' && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">Could not load categories. Check API connection.</p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">Quantity *</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="3"
              min="1"
              max={selectedCategoryStock}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 sm:px-4 py-2 sm:py-3 text-base placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none"
              style={{ fontSize: '16px' }}
              required
            />
            {formData.categoryId && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Available: {selectedCategoryStock} items</p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
              Selling Price per Item (LKR) *
            </label>
            <input
              type="number"
              value={formData.sellingPricePerItem}
              onChange={(e) => setFormData({ ...formData, sellingPricePerItem: e.target.value })}
              placeholder="500"
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 sm:px-4 py-2 sm:py-3 text-base placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none"
              style={{ fontSize: '16px' }}
              required
            />
          </div>
        </div>

        {formData.quantity && formData.sellingPricePerItem && (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
            <p className="text-sm text-green-800">
              <strong>Total Sale Amount:</strong> LKR{' '}
              {(Number(formData.quantity) * Number(formData.sellingPricePerItem)).toLocaleString()}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white hover:bg-green-700 active:scale-95 transition-transform"
        >
          Add Sale
        </button>
      </form>

      {/* Sales List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales History</h2>
        <div className="space-y-3">
          {salesStatus === 'loading' && <p className="text-center text-gray-500 dark:text-gray-400 py-8">Loading sales...</p>}
          {salesStatus !== 'loading' && sales.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No sales recorded yet</p>
          ) : (
            sales.map((sale) => (
              <div key={sale.id} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {sale.categoryName}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(sale.date).toLocaleDateString()}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Quantity Sold</p>
                        <p className="font-medium text-gray-900 dark:text-white">{sale.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Price/Item</p>
                        <p className="font-medium text-gray-900 dark:text-white">LKR {sale.sellingPricePerItem}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Total Amount</p>
                        <p className="font-medium text-green-600 dark:text-green-400">LKR {sale.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(sale.id)}
                    className="ml-4 rounded-lg bg-red-50 dark:bg-red-900/20 px-3 py-1 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-green-800">Total Sales</p>
            <p className="text-2xl font-bold text-green-900">{sales.length}</p>
          </div>
          <div>
            <p className="text-green-800">Total Revenue</p>
            <p className="text-2xl font-bold text-green-900">LKR {totalSalesValue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesPage

