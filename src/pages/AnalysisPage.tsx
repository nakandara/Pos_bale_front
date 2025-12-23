import { useState } from 'react'
import { useAppSelector } from '../store/hooks'

const AnalysisPage = () => {
  const purchases = useAppSelector((state) => state.purchases.purchases)
  const sales = useAppSelector((state) => state.sales.sales)
  const categories = useAppSelector((state) => state.categories.categories)

  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())

  // Filter data by selected month
  const filterByMonth = <T extends { date: string }>(items: T[]) => {
    return items.filter((item) => {
      const itemDate = new Date(item.date)
      return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear
    })
  }

  const monthPurchases = filterByMonth(purchases)
  const monthSales = filterByMonth(sales)

  // Calculate totals
  const totalIncome = monthSales.reduce((sum, s) => sum + s.totalAmount, 0)
  const totalOutcome = monthPurchases.reduce((sum, p) => sum + p.totalCost, 0)
  const profit = totalIncome - totalOutcome

  // Category-wise analysis
  const categoryAnalysis = categories.map((category) => {
    const catSales = monthSales.filter((s) => s.categoryId === category.id)
    const catPurchases = monthPurchases.filter((p) => p.categoryId === category.id)

    const revenue = catSales.reduce((sum, s) => sum + s.totalAmount, 0)
    const cost = catPurchases.reduce((sum, p) => sum + p.totalCost, 0)
    const catProfit = revenue - cost
    const quantitySold = catSales.reduce((sum, s) => sum + s.quantity, 0)

    return {
      name: category.name,
      revenue,
      cost,
      profit: catProfit,
      quantitySold,
    }
  })

  // Best performing category
  const bestCategory = categoryAnalysis.reduce(
    (best, cat) => (cat.profit > best.profit ? cat : best),
    categoryAnalysis[0] || { name: 'N/A', profit: 0 }
  )

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Monthly-Analysis</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Income, Outcome, and Profit analysis</p>
        </div>

        {/* Month/Year Selector */}
        <div className="flex gap-2 sm:gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2 text-sm sm:text-base focus:border-blue-500 focus:outline-none"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2 text-sm sm:text-base focus:border-blue-500 focus:outline-none"
          >
            {[2024, 2025, 2026].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-lg bg-green-50 p-4 sm:p-5 lg:p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm font-medium text-green-800">Income (Sales)</p>
            <span className="text-xl sm:text-2xl">💰</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-green-900">LKR {totalIncome.toLocaleString()}</p>
          <p className="text-xs sm:text-sm text-green-700 mt-2">{monthSales.length} sales transactions</p>
        </div>

        <div className="rounded-lg bg-red-50 p-4 sm:p-5 lg:p-6 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm font-medium text-red-800">Outcome (Purchases)</p>
            <span className="text-xl sm:text-2xl">📦</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-red-900">LKR {totalOutcome.toLocaleString()}</p>
          <p className="text-xs sm:text-sm text-red-700 mt-2">{monthPurchases.length} purchase transactions</p>
        </div>

        <div className={`rounded-lg p-4 sm:p-5 lg:p-6 border ${profit >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} sm:col-span-2 lg:col-span-1`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-xs sm:text-sm font-medium ${profit >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
              {profit >= 0 ? 'Profit' : 'Loss'}
            </p>
            <span className="text-xl sm:text-2xl">{profit >= 0 ? '📈' : '📉'}</span>
          </div>
          <p className={`text-2xl sm:text-3xl font-bold ${profit >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
            LKR {Math.abs(profit).toLocaleString()}
          </p>
          <p className={`text-xs sm:text-sm mt-2 ${profit >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
            {profit >= 0 ? 'Positive' : 'Negative'} ({totalOutcome > 0 ? ((profit / totalOutcome) * 100).toFixed(1) : 0}
            % margin)
          </p>
        </div>
      </div>

      {/* Best Performing Category */}
      {bestCategory.profit > 0 && (
        <div className="rounded-lg bg-purple-50 border border-purple-200 p-6">
          <h3 className="text-sm font-medium text-purple-800 mb-2">🏆 Best Performing Category</h3>
          <p className="text-xl font-bold text-purple-900">{bestCategory.name}</p>
          <p className="text-sm text-purple-700 mt-1">Profit: LKR {bestCategory.profit.toLocaleString()}</p>
        </div>
      )}

      {/* Category-wise Performance */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Category-wise Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categoryAnalysis.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No data for selected month
                  </td>
                </tr>
              ) : (
                categoryAnalysis
                  .filter((cat) => cat.quantitySold > 0 || cat.cost > 0)
                  .map((cat) => (
                    <tr key={cat.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{cat.quantitySold}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 font-medium">LKR {cat.revenue.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-600 font-medium">LKR {cat.cost.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium ${cat.profit >= 0 ? 'text-blue-600' : 'text-orange-600'}`}
                        >
                          LKR {cat.profit.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${cat.profit >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{
                              width: `${Math.min(100, Math.abs((cat.profit / totalIncome) * 100))}%`,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-3">💡 Insights</h3>
        <ul className="space-y-2 text-sm text-yellow-900">
          {profit > 0 && (
            <li>✅ Profitable month! You made LKR {profit.toLocaleString()} profit.</li>
          )}
          {profit < 0 && (
            <li>⚠️ Loss this month. Consider reducing costs or increasing sales.</li>
          )}
          {monthSales.length === 0 && monthPurchases.length === 0 && (
            <li>📊 No transactions recorded for this month yet.</li>
          )}
          {bestCategory.profit > 0 && (
            <li>🏆 {bestCategory.name} is your best performing category.</li>
          )}
          {monthSales.length > 0 && (
            <li>
              📈 Average sale value: LKR {(totalIncome / monthSales.length).toFixed(2)}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default AnalysisPage

