import { useEffect, useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import CategoriesPage from './pages/CategoriesPage'
import PurchasesPage from './pages/PurchasesPage'
import SalesPage from './pages/SalesPage'
import InventoryPage from './pages/InventoryPage'
import AnalysisPage from './pages/AnalysisPage'
import { useAppDispatch } from './store/hooks'
import { fetchCategories } from './store/categoriesSlice'
import { fetchPurchases } from './store/purchasesSlice'
import { fetchSales } from './store/salesSlice'

type Page = 'dashboard' | 'analysis' | 'purchases' | 'sales' | 'inventory' | 'categories'

function App() {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // initial data load from backend
    dispatch(fetchCategories())
    dispatch(fetchPurchases())
    dispatch(fetchSales())
  }, [dispatch])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={(page) => setCurrentPage(page as Page)} />
      case 'analysis':
        return <AnalysisPage />
      case 'purchases':
        return <PurchasesPage />
      case 'sales':
        return <SalesPage />
      case 'inventory':
        return <InventoryPage />
      case 'categories':
        return <CategoriesPage />
      default:
        return <DashboardPage onNavigate={(page) => setCurrentPage(page as Page)} />
    }
  }

  const navItems: { id: Page; label: string; icon: string; description: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', description: 'Overview' },
    { id: 'purchases', label: 'Purchases', icon: '📦', description: 'Stock In' },
    { id: 'sales', label: 'Sales', icon: '💰', description: 'Stock Out' },
    { id: 'inventory', label: 'Inventory', icon: '📋', description: 'Current Stock' },
    { id: 'analysis', label: 'Analysis', icon: '📊', description: 'Reports' },
    { id: 'categories', label: 'Categories', icon: '📁', description: 'Setup' },
  ]

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col shadow-2xl fixed lg:static inset-y-0 left-0 z-50 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Logo Section */}
        <div className="p-4 lg:p-6 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <span className="text-2xl">🏪</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <h1 className="text-base lg:text-lg font-bold">Red Rose</h1>
                <p className="text-xs text-blue-200">POS System</p>
              </div>
            )}
            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-white hover:bg-blue-700 p-2 rounded"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 lg:py-6 overflow-y-auto">
          <div className="space-y-1 px-2 lg:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-all ${
                  currentPage === item.id
                    ? 'bg-white text-blue-900 shadow-lg'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <span className="text-xl lg:text-2xl">{item.icon}</span>
                {sidebarOpen && (
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className={`text-xs ${currentPage === item.id ? 'text-blue-600' : 'text-blue-300'}`}>
                      {item.description}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar Toggle - Desktop Only */}
        <div className="hidden lg:block p-4 border-t border-blue-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <span className="text-xl">{sidebarOpen ? '◀' : '▶'}</span>
            {sidebarOpen && <span className="text-sm font-medium">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Header */}
        <header className="bg-white shadow-md z-10">
          <div className="px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-gray-700 hover:text-gray-900 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex-1 lg:flex-none">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                  {navItems.find((item) => item.id === currentPage)?.label}
                </h2>
                <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">
                  {navItems.find((item) => item.id === currentPage)?.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs lg:text-sm font-medium text-gray-900">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-600 hidden lg:block">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 lg:p-2 rounded-full">
                  <span className="text-base lg:text-xl">👤</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">{renderPage()}</div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-3 sm:px-4 lg:px-6 py-2 lg:py-3">
          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p className="text-gray-600">© {new Date().getFullYear()} Clothes Shop POS</p>
            <p className="text-gray-500 hidden sm:block">Made with ❤️ wgpn Nakandara</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
