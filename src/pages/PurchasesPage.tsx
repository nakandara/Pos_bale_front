import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { createPurchase, fetchPurchases, removePurchase } from '../store/purchasesSlice'
import { fetchCategories } from '../store/categoriesSlice'

const PurchasesPage = () => {
  const dispatch = useAppDispatch()
  const { categories, status: categoriesStatus } = useAppSelector((state) => state.categories)
  const { purchases, status: purchaseStatus } = useAppSelector((state) => state.purchases)

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    categoryId: '',
    quantity: '',
    totalCost: '',
    sellingPricePerItem: '',
    supplier: '',
  })

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories())
    }
    if (purchaseStatus === 'idle') {
      dispatch(fetchPurchases())
    }
  }, [dispatch, categoriesStatus, purchaseStatus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.categoryId || !formData.quantity || !formData.totalCost || !formData.sellingPricePerItem) {
      alert('Please fill in all required fields')
      return
    }

    const category = categories.find((c) => c.id === formData.categoryId)
    if (!category) return

    dispatch(
      createPurchase({
        date: formData.date,
        categoryId: formData.categoryId,
        categoryName: category.name,
        quantity: Number(formData.quantity),
        totalCost: Number(formData.totalCost),
        sellingPricePerItem: Number(formData.sellingPricePerItem),
        supplier: formData.supplier,
      })
    )

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      categoryId: '',
      quantity: '',
      totalCost: '',
      sellingPricePerItem: '',
      supplier: '',
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this purchase record?')) {
      dispatch(removePurchase(id))
    }
  }

  const totalPurchaseValue = purchases.reduce((sum, p) => sum + p.totalCost, 0)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white dark:text-white">Purchase Entry</h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 mt-1">Record wholesale purchases (stock coming in)</p>
      </div>

      {/* Purchase Form */}
      <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 dark:border-gray-700 dark:border-gray-700 bg-white dark:bg-gray-800 dark:bg-gray-800 p-4 sm:p-5 lg:p-6 space-y-4 transition-colors">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-1.5 sm:mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:border-gray-600 bg-white dark:bg-gray-800 dark:bg-gray-700 text-gray-900 dark:text-white dark:text-white px-3 sm:px-4 py-2 sm:py-3 text-base focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none"
              style={{ fontSize: '16px' }}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">Category *</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 sm:py-3 text-base focus:border-blue-500 focus:outline-none"
              style={{ fontSize: '16px' }}
              required
              disabled={categoriesStatus === 'loading' || categories.length === 0}
            >
              <option value="">
                {categoriesStatus === 'loading' ? 'Loading categories...' : 'Select category...'}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
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
              placeholder="150"
              min="1"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 sm:py-3 text-base focus:border-blue-500 focus:outline-none"
              style={{ fontSize: '16px' }}
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">Total Cost (LKR) *</label>
            <input
              type="number"
              value={formData.totalCost}
              onChange={(e) => setFormData({ ...formData, totalCost: e.target.value })}
              placeholder="40000"
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 sm:py-3 text-base focus:border-blue-500 focus:outline-none"
              style={{ fontSize: '16px' }}
              required
            />
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
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 sm:py-3 text-base focus:border-blue-500 focus:outline-none"
              style={{ fontSize: '16px' }}
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">Supplier (Optional)</label>
            <input
              type="text"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              placeholder="ABC Wholesale"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 sm:py-3 text-base focus:border-blue-500 focus:outline-none"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>

        {formData.quantity && formData.totalCost && (
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
            <p className="text-sm text-blue-800">
              <strong>Cost per Item:</strong> LKR{' '}
              {(Number(formData.totalCost) / Number(formData.quantity)).toFixed(2)}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white hover:bg-blue-700 active:scale-95 transition-transform"
        >
          Add Purchase
        </button>
      </form>

      {/* Purchases List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Purchase History</h2>
        <div className="space-y-3">
          {purchaseStatus === 'loading' && <p className="text-center text-gray-500 dark:text-gray-400 py-8">Loading purchases...</p>}
          {purchaseStatus !== 'loading' && purchases.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No purchases recorded yet</p>
          ) : (
            purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {purchase.categoryName}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(purchase.date).toLocaleDateString()}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Quantity</p>
                        <p className="font-medium text-gray-900 dark:text-white">{purchase.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Total Cost</p>
                        <p className="font-medium text-gray-900 dark:text-white">LKR {purchase.totalCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Cost/Item</p>
                        <p className="font-medium text-gray-900 dark:text-white">LKR {purchase.costPerItem.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Selling Price</p>
                        <p className="font-medium text-green-600 dark:text-green-400">LKR {purchase.sellingPricePerItem}</p>
                      </div>
                    </div>
                    {purchase.supplier && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Supplier: {purchase.supplier}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(purchase.id)}
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
            <p className="text-green-800">Total Purchases</p>
            <p className="text-2xl font-bold text-green-900">{purchases.length}</p>
          </div>
          <div>
            <p className="text-green-800">Total Investment</p>
            <p className="text-2xl font-bold text-green-900">LKR {totalPurchaseValue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasesPage

