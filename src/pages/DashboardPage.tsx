import { useAppSelector } from '../store/hooks'

interface DashboardPageProps {
  onNavigate?: (page: string) => void
}

const DashboardPage = ({ onNavigate }: DashboardPageProps) => {
  const categories = useAppSelector((state) => state.categories.categories)
  const purchases = useAppSelector((state) => state.purchases.purchases)
  const sales = useAppSelector((state) => state.sales.sales)

  // Calculate total stats
  const totalPurchaseValue = purchases.reduce((sum, p) => sum + p.totalCost, 0)
  const totalSalesValue = sales.reduce((sum, s) => sum + s.totalAmount, 0)
  const totalProfit = totalSalesValue - totalPurchaseValue

  // Calculate total stock
  const totalStock = categories.reduce((total, category) => {
    const bought = purchases.filter((p) => p.categoryId === category.id).reduce((sum, p) => sum + p.quantity, 0)
    const sold = sales.filter((s) => s.categoryId === category.id).reduce((sum, s) => sum + s.quantity, 0)
    return total + (bought - sold)
  }, 0)

  // Recent activities
  const recentPurchases = purchases.slice(-3).reverse()
  const recentSales = sales.slice(-3).reverse()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-lg p-4 sm:p-6 lg:p-8 text-white shadow-lg">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Welcome to Clothes Shop Dashboard 👋</h1>
        <p className="text-sm sm:text-base text-blue-100 dark:text-blue-200">Here's what's happening with your business today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Sales */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-green-500 dark:border-green-400 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">
                LKR {totalSalesValue.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 sm:p-3 rounded-full flex-shrink-0 ml-2">
              <span className="text-2xl sm:text-3xl">💰</span>
            </div>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2 sm:mt-3">↑ {sales.length} transactions</p>
        </div>

        {/* Total Purchases */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-blue-500 dark:border-blue-400 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Purchases</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">
                LKR {totalPurchaseValue.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 sm:p-3 rounded-full flex-shrink-0 ml-2">
              <span className="text-2xl sm:text-3xl">📦</span>
            </div>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 sm:mt-3">↓ {purchases.length} orders</p>
        </div>

        {/* Profit */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-purple-500 dark:border-purple-400 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Profit</p>
              <p className={`text-lg sm:text-xl lg:text-2xl font-bold mt-1 truncate ${totalProfit >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
                LKR {Math.abs(totalProfit).toLocaleString()}
              </p>
            </div>
            <div className={`${totalProfit >= 0 ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-red-100 dark:bg-red-900/30'} p-2 sm:p-3 rounded-full flex-shrink-0 ml-2`}>
              <span className="text-2xl sm:text-3xl">{totalProfit >= 0 ? '📈' : '📉'}</span>
            </div>
          </div>
          <p className={`text-xs mt-2 sm:mt-3 ${totalProfit >= 0 ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400'}`}>
            {totalProfit >= 0 ? '↑ Positive' : '↓ Negative'}
          </p>
        </div>

        {/* Stock Items */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-orange-500 dark:border-orange-400 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Stock Items</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalStock}</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 sm:p-3 rounded-full flex-shrink-0 ml-2">
              <span className="text-2xl sm:text-3xl">📋</span>
            </div>
          </div>
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 sm:mt-3">{categories.length} categories</p>
        </div>
      </div>

      {/* Charts & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Purchases */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 lg:p-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Purchases</h2>
            <span className="text-2xl">📦</span>
          </div>
          {recentPurchases.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No purchases yet</p>
          ) : (
            <div className="space-y-3">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{purchase.categoryName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(purchase.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{purchase.quantity} items</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">LKR {purchase.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Sales */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 lg:p-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Sales</h2>
            <span className="text-2xl">💰</span>
          </div>
          {recentSales.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No sales yet</p>
          ) : (
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{sale.categoryName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(sale.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{sale.quantity} items</p>
                    <p className="text-sm text-green-600 dark:text-green-400">LKR {sale.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 lg:p-6 transition-colors">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate?.('purchases')}
            className="flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-2">📦</span>
            <span className="text-xs sm:text-sm font-medium text-blue-900 dark:text-blue-300 text-center">Add Purchase</span>
          </button>
          <button
            onClick={() => onNavigate?.('sales')}
            className="flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-2">💰</span>
            <span className="text-xs sm:text-sm font-medium text-green-900 dark:text-green-300 text-center">Add Sale</span>
          </button>
          <button
            onClick={() => onNavigate?.('inventory')}
            className="flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-2">📋</span>
            <span className="text-xs sm:text-sm font-medium text-purple-900 dark:text-purple-300 text-center">View Stock</span>
          </button>
          <button
            onClick={() => onNavigate?.('analysis')}
            className="flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-2">📊</span>
            <span className="text-xs sm:text-sm font-medium text-orange-900 dark:text-orange-300 text-center">View Reports</span>
          </button>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 lg:p-6 transition-colors">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Categories Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((category) => {
            const stock =
              purchases.filter((p) => p.categoryId === category.id).reduce((sum, p) => sum + p.quantity, 0) -
              sales.filter((s) => s.categoryId === category.id).reduce((sum, s) => sum + s.quantity, 0)

            return (
              <div
                key={category.id}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3 sm:p-4 text-center border border-transparent dark:border-gray-700"
              >
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">{category.name}</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1 sm:mt-2">{stock}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">items in stock</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

