import { useState, useEffect } from 'react'
import { useAppSelector } from '../store/hooks'
import { api } from '../services/api'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const AnalysisPage = () => {
  const purchases = useAppSelector((state) => state.purchases.purchases)
  const sales = useAppSelector((state) => state.sales.sales)
  const categories = useAppSelector((state) => state.categories.categories)

  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [weeklyData, setWeeklyData] = useState<any>(null)
  const [weeklySummary, setWeeklySummary] = useState<any>(null)
  const [loadingWeekly, setLoadingWeekly] = useState(false)
  const [weeklyError, setWeeklyError] = useState<string>('')
  const [weeklyPeriod, setWeeklyPeriod] = useState<'2weeks' | '4weeks' | '8weeks' | '12weeks'>('8weeks')
  
  const [dayOfWeekData, setDayOfWeekData] = useState<any>(null)
  const [dayOfWeekSummary, setDayOfWeekSummary] = useState<any>(null)
  const [loadingDayOfWeek, setLoadingDayOfWeek] = useState(false)
  const [dayOfWeekError, setDayOfWeekError] = useState<string>('')
  const [dayOfWeekPeriod, setDayOfWeekPeriod] = useState<'2weeks' | '4weeks' | '8weeks'>('2weeks')

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

  // Fetch weekly sales data
  useEffect(() => {
    const fetchWeeklyData = async () => {
      setLoadingWeekly(true)
      setWeeklyError('')
      try {
        const weeks = weeklyPeriod === '2weeks' ? 2 : weeklyPeriod === '4weeks' ? 4 : weeklyPeriod === '8weeks' ? 8 : 12
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - (weeks * 7))
        
        console.log('Fetching weekly sales from', startDate.toISOString(), 'to', endDate.toISOString())
        
        const response = await api.fetchWeeklySales(
          startDate.toISOString(),
          endDate.toISOString()
        )
        
        console.log('Weekly sales response:', response)
        
        setWeeklyData(response.data || [])
        setWeeklySummary(response.summary || {})
      } catch (error: any) {
        console.error('Error fetching weekly sales:', error)
        setWeeklyError(error?.message || 'Failed to load weekly data')
        setWeeklyData([])
        setWeeklySummary({})
      } finally {
        setLoadingWeekly(false)
      }
    }
    
    fetchWeeklyData()
  }, [weeklyPeriod])

  // Fetch day-of-week sales data
  useEffect(() => {
    const fetchDayOfWeekData = async () => {
      setLoadingDayOfWeek(true)
      setDayOfWeekError('')
      try {
        const weeks = dayOfWeekPeriod === '2weeks' ? 2 : dayOfWeekPeriod === '4weeks' ? 4 : 8
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - (weeks * 7))
        
        console.log('Fetching day-of-week sales from', startDate.toISOString(), 'to', endDate.toISOString())
        
        const response = await api.fetchDayOfWeekSales(
          startDate.toISOString(),
          endDate.toISOString()
        )
        
        console.log('Day-of-week sales response:', response)
        
        setDayOfWeekData(response.data || [])
        setDayOfWeekSummary(response.summary || {})
      } catch (error: any) {
        console.error('Error fetching day-of-week sales:', error)
        setDayOfWeekError(error?.message || 'Failed to load day-of-week data')
        setDayOfWeekData([])
        setDayOfWeekSummary({})
      } finally {
        setLoadingDayOfWeek(false)
      }
    }
    
    fetchDayOfWeekData()
  }, [dayOfWeekPeriod])

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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Sales Analysis</h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Weekly trends, monthly analysis, and performance insights</p>
        </div>

      </div>

      {/* Weekly Sales Performance Section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📊 Weekly Sales Performance</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Track sales trends over time</p>
            </div>
            <select
              value={weeklyPeriod}
              onChange={(e) => setWeeklyPeriod(e.target.value as any)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="2weeks">Last 2 Weeks</option>
              <option value="4weeks">Last 4 Weeks</option>
              <option value="8weeks">Last 8 Weeks</option>
              <option value="12weeks">Last 12 Weeks</option>
            </select>
          </div>
        </div>

        {loadingWeekly ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Loading weekly data...</p>
          </div>
        ) : weeklyError ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-600 dark:text-red-400 font-semibold">Error Loading Data</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{weeklyError}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Check console for details or ensure backend is running</p>
          </div>
        ) : weeklyData && weeklyData.length > 0 ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-gray-700/30">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Weeks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklySummary?.totalWeeks || 0}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  LKR {Number(weeklySummary?.totalRevenue || 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Weekly Revenue</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  LKR {Number(weeklySummary?.averageWeeklyRevenue || 0).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Line Chart */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="weekLabel" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any) => [`LKR ${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="totalRevenue" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Revenue"
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Transactions & Quantity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="weekLabel" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="transactionCount" fill="#10b981" name="Transactions" />
                  <Bar dataKey="totalQuantity" fill="#f59e0b" name="Items Sold" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Table */}
            <div className="overflow-x-auto border-t border-gray-200 dark:border-gray-700">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Week</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Transactions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Items Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Avg/Transaction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {weeklyData.map((week: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{week.weekLabel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                          LKR {week.totalRevenue.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{week.transactionCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{week.totalQuantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600 dark:text-blue-400">
                          LKR {Number(week.averagePerTransaction).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-600 dark:text-gray-400">No weekly sales data available</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Start making sales to see weekly trends</p>
          </div>
        )}
      </div>

      {/* Day of Week Performance Section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📅 Day of Week Performance</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Which days are busiest?</p>
            </div>
            <select
              value={dayOfWeekPeriod}
              onChange={(e) => setDayOfWeekPeriod(e.target.value as any)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="2weeks">Last 2 Weeks</option>
              <option value="4weeks">Last 4 Weeks</option>
              <option value="8weeks">Last 8 Weeks</option>
            </select>
          </div>
        </div>

        {loadingDayOfWeek ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Loading day-of-week data...</p>
          </div>
        ) : dayOfWeekError ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-600 dark:text-red-400 font-semibold">Error Loading Data</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{dayOfWeekError}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Check console for details</p>
          </div>
        ) : dayOfWeekData && dayOfWeekData.length > 0 ? (
          <>
            {/* Best/Worst Day Cards */}
            {dayOfWeekSummary && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-gray-50 dark:bg-gray-700/30">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border-2 border-green-300 dark:border-green-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏆</span>
                    <p className="text-xs font-semibold text-green-800 dark:text-green-300">BEST DAY</p>
                  </div>
                  <p className="text-xl font-bold text-green-900 dark:text-green-100">{dayOfWeekSummary.bestDay?.name}</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    LKR {Number(dayOfWeekSummary.bestDay?.revenue || 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📉</span>
                    <p className="text-xs font-semibold text-orange-800 dark:text-orange-300">SLOWEST DAY</p>
                  </div>
                  <p className="text-xl font-bold text-orange-900 dark:text-orange-100">{dayOfWeekSummary.worstDay?.name}</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    LKR {Number(dayOfWeekSummary.worstDay?.revenue || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {/* Bar Chart - Revenue by Day */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Revenue by Day of Week</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dayOfWeekData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="dayName" 
                    tick={{ fontSize: 13, fontWeight: 500 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any) => [`LKR ${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                  <Legend />
                  <Bar 
                    dataKey="totalRevenue" 
                    fill="#8b5cf6" 
                    name="Revenue"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Transaction Count Chart */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Transactions by Day</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dayOfWeekData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="dayName" 
                    tick={{ fontSize: 13, fontWeight: 500 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="transactionCount" fill="#ec4899" name="Transactions" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="totalQuantity" fill="#f59e0b" name="Items Sold" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Table */}
            <div className="overflow-x-auto border-t border-gray-200 dark:border-gray-700">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Transactions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Items Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Avg/Transaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {dayOfWeekData.map((day: any, index: number) => {
                    const maxRevenue = Math.max(...dayOfWeekData.map((d: any) => d.totalRevenue))
                    const performancePercent = maxRevenue > 0 ? (day.totalRevenue / maxRevenue) * 100 : 0
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {day.dayName === dayOfWeekSummary?.bestDay?.name ? '🏆' : 
                               day.dayName === dayOfWeekSummary?.worstDay?.name && day.totalRevenue > 0 ? '📉' : '📅'}
                            </span>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{day.dayName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                            LKR {day.totalRevenue.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{day.transactionCount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{day.totalQuantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-600 dark:text-blue-400">
                            LKR {Number(day.averagePerTransaction).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 max-w-[100px]">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                                style={{ width: `${performancePercent}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{performancePercent.toFixed(0)}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Insights */}
            <div className="p-6 bg-purple-50 dark:bg-purple-900/10 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-3">💡 Day-of-Week Insights</h3>
              <ul className="space-y-2 text-sm text-purple-900 dark:text-purple-200">
                {dayOfWeekSummary?.bestDay && (
                  <li>🏆 <strong>{dayOfWeekSummary.bestDay.name}</strong> is your best performing day with LKR {Number(dayOfWeekSummary.bestDay.revenue).toLocaleString()} in revenue</li>
                )}
                {dayOfWeekSummary?.worstDay && dayOfWeekSummary.worstDay.revenue > 0 && (
                  <li>📉 <strong>{dayOfWeekSummary.worstDay.name}</strong> is your slowest day - consider special promotions</li>
                )}
                {dayOfWeekData && (
                  <li>📊 Total transactions across all days: {dayOfWeekData.reduce((sum: number, d: any) => sum + d.transactionCount, 0)}</li>
                )}
              </ul>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-gray-600 dark:text-gray-400">No day-of-week data available</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Start making sales to see which days perform best</p>
          </div>
        )}
      </div>

      {/* Monthly Analysis Section Header */}
      <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Monthly Analysis</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Income, Outcome, and Profit breakdown</p>
      </div>

      {/* Month/Year Selector */}
      <div className="flex justify-end gap-2 sm:gap-3">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 sm:py-3 text-base focus:border-blue-500 focus:outline-none"
          style={{ fontSize: '16px' }}
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
          className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2 sm:py-3 text-base focus:border-blue-500 focus:outline-none"
          style={{ fontSize: '16px' }}
        >
          {[2024, 2025, 2026].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 sm:p-5 lg:p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm font-medium text-green-800">Income (Sales)</p>
            <span className="text-xl sm:text-2xl">💰</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-green-900">LKR {totalIncome.toLocaleString()}</p>
          <p className="text-xs sm:text-sm text-green-700 mt-2">{monthSales.length} sales transactions</p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 sm:p-5 lg:p-6 border border-red-200">
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
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Category-wise Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Qty Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Profit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categoryAnalysis.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No data for selected month
                  </td>
                </tr>
              ) : (
                categoryAnalysis
                  .filter((cat) => cat.quantitySold > 0 || cat.cost > 0)
                  .map((cat) => (
                    <tr key={cat.name} className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{cat.quantitySold}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium">LKR {cat.revenue.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-600 dark:text-red-400 font-medium">LKR {cat.cost.toLocaleString()}</div>
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

