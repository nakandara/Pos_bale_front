import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchCategories } from '../store/categoriesSlice'
import { fetchPurchases } from '../store/purchasesSlice'
import { fetchSales } from '../store/salesSlice'

const InventoryPage = () => {
  const dispatch = useAppDispatch()
  const { categories, status: categoryStatus } = useAppSelector((state) => state.categories)
  const { purchases, status: purchaseStatus } = useAppSelector((state) => state.purchases)
  const { sales, status: salesStatus } = useAppSelector((state) => state.sales)

  useEffect(() => {
    if (categoryStatus === 'idle') dispatch(fetchCategories())
    if (purchaseStatus === 'idle') dispatch(fetchPurchases())
    if (salesStatus === 'idle') dispatch(fetchSales())
  }, [dispatch, categoryStatus, purchaseStatus, salesStatus])

  // Calculate stock for each category
  const inventoryData = categories.map((category) => {
    const categoryPurchases = purchases.filter((p) => p.categoryId === category.id)
    const categorySales = sales.filter((s) => s.categoryId === category.id)

    const totalBought = categoryPurchases.reduce((sum, p) => sum + p.quantity, 0)
    const totalSold = categorySales.reduce((sum, s) => sum + s.quantity, 0)
    const remaining = totalBought - totalSold

    // Calculate average cost and selling price
    const totalCost = categoryPurchases.reduce((sum, p) => sum + p.totalCost, 0)
    const avgCostPerItem = totalBought > 0 ? totalCost / totalBought : 0

    const avgSellingPrice =
      categoryPurchases.length > 0
        ? categoryPurchases.reduce((sum, p) => sum + p.sellingPricePerItem, 0) / categoryPurchases.length
        : 0

    // Stock value
    const costValue = remaining * avgCostPerItem
    const sellingValue = remaining * avgSellingPrice

    return {
      category: category.name,
      categoryId: category.id,
      totalBought,
      totalSold,
      remaining,
      avgCostPerItem,
      avgSellingPrice,
      costValue,
      sellingValue,
    }
  })

  const totalStockValue = inventoryData.reduce((sum, item) => sum + item.costValue, 0)
  const totalPotentialValue = inventoryData.reduce((sum, item) => sum + item.sellingValue, 0)
  const totalRemainingItems = inventoryData.reduce((sum, item) => sum + item.remaining, 0)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Stock / Inventory</h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Current stock levels for all categories</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-blue-800">Total Items in Stock</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-900">{totalRemainingItems}</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-purple-800">Stock Cost Value</p>
          <p className="text-2xl sm:text-3xl font-bold text-purple-900">LKR {totalStockValue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-green-800">Potential Selling Value</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-900">LKR {totalPotentialValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Bought
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Remaining
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Avg Cost/Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Selling Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
              {inventoryData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No inventory data available. Add categories and purchases first.
                  </td>
                </tr>
              ) : (
                inventoryData.map((item) => (
                  <tr key={item.categoryId} className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700/50">
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{item.category}</div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{item.totalBought}</div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{item.totalSold}</div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                          item.remaining > 20
                            ? 'bg-green-100 text-green-800'
                            : item.remaining > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.remaining}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">LKR {item.avgCostPerItem.toFixed(2)}</div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">LKR {item.avgSellingPrice.toFixed(2)}</div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        LKR {item.costValue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        (Worth: LKR {item.sellingValue.toLocaleString()})
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Warning */}
      {inventoryData.some((item) => item.remaining > 0 && item.remaining <= 10) && (
        <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">⚠️ Low Stock Alert</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            {inventoryData
              .filter((item) => item.remaining > 0 && item.remaining <= 10)
              .map((item) => (
                <li key={item.categoryId}>
                  {item.category}: Only {item.remaining} items remaining
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Out of Stock Warning */}
      {inventoryData.some((item) => item.remaining === 0 && item.totalBought > 0) && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 p-4">
          <h3 className="text-sm font-medium text-red-800 mb-2">🚫 Out of Stock</h3>
          <ul className="text-sm text-red-700 space-y-1">
            {inventoryData
              .filter((item) => item.remaining === 0 && item.totalBought > 0)
              .map((item) => (
                <li key={item.categoryId}>{item.category}: Out of stock - reorder needed</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default InventoryPage

