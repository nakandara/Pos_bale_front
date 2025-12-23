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
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 sm:p-6 lg:p-8 text-white">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Welcome to Your Shop Dashboard 👋</h1>
        <p className="text-sm sm:text-base text-blue-100">Here's what's happening with your business today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Sales */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mt-1 truncate">
                LKR {totalSalesValue.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0 ml-2">
              <span className="text-2xl sm:text-3xl">💰</span>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 sm:mt-3">↑ {sales.length} transactions</p>
        </div>

        {/* Total Purchases */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Purchases</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mt-1 truncate">
                LKR {totalPurchaseValue.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 p-2 sm:p-3 rounded-full flex-shrink-0 ml-2">
              <span className="text-2xl sm:text-3xl">📦</span>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2 sm:mt-3">↓ {purchases.length} orders</p>
        </div>

        {/* Profit */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Profit</p>
              <p className={`text-lg sm:text-xl lg:text-2xl font-bold mt-1 truncate ${totalProfit >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                LKR {Math.abs(totalProfit).toLocaleString()}
              </p>
            </div>
            <div className={`${totalProfit >= 0 ? 'bg-purple-100' : 'bg-red-100'} p-2 sm:p-3 rounded-full flex-shrink-0 ml-2`}>
              <span className="text-2xl sm:text-3xl">{totalProfit >= 0 ? '📈' : '📉'}</span>
            </div>
          </div>
          <p className={`text-xs mt-2 sm:mt-3 ${totalProfit >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
            {totalProfit >= 0 ? '↑ Positive' : '↓ Negative'}
          </p>
        </div>

        {/* Stock Items */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Stock Items</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mt-1">{totalStock}</p>
            </div>
            <div className="bg-orange-100 p-2 sm:p-3 rounded-full flex-shrink-0 ml-2">
              <span className="text-2xl sm:text-3xl">📋</span>
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2 sm:mt-3">{categories.length} categories</p>
        </div>
      </div>

      {/* Charts & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Purchases */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Purchases</h2>
            <span className="text-2xl">📦</span>
          </div>
          {recentPurchases.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No purchases yet</p>
          ) : (
            <div className="space-y-3">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <p className="font-medium text-gray-900">{purchase.categoryName}</p>
                    <p className="text-sm text-gray-500">{new Date(purchase.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{purchase.quantity} items</p>
                    <p className="text-sm text-blue-600">LKR {purchase.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
            <span className="text-2xl">💰</span>
          </div>
          {recentSales.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No sales yet</p>
          ) : (
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <p className="font-medium text-gray-900">{sale.categoryName}</p>
                    <p className="text-sm text-gray-500">{new Date(sale.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{sale.quantity} items</p>
                    <p className="text-sm text-green-600">LKR {sale.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 lg:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate?.('purchases')}
            className="flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-2">📦</span>
            <span className="text-xs sm:text-sm font-medium text-blue-900 text-center">Add Purchase</span>
          </button>
          <button
            onClick={() => onNavigate?.('sales')}
            className="flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-2">💰</span>
            <span className="text-xs sm:text-sm font-medium text-green-900 text-center">Add Sale</span>
          </button>
          <button
            onClick={() => onNavigate?.('inventory')}
            className="flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-2">📋</span>
            <span className="text-xs sm:text-sm font-medium text-purple-900 text-center">View Stock</span>
          </button>
          <button
            onClick={() => onNavigate?.('analysis')}
            className="flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-2">📊</span>
            <span className="text-xs sm:text-sm font-medium text-orange-900 text-center">View Reports</span>
          </button>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 lg:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Categories Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((category) => {
            const stock =
              purchases.filter((p) => p.categoryId === category.id).reduce((sum, p) => sum + p.quantity, 0) -
              sales.filter((s) => s.categoryId === category.id).reduce((sum, s) => sum + s.quantity, 0)

            return (
              <div
                key={category.id}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 sm:p-4 text-center"
              >
                <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{category.name}</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1 sm:mt-2">{stock}</p>
                <p className="text-xs text-gray-600">items in stock</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

