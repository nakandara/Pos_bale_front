const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pos-bale-back.vercel.app/api'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

async function request<T>(path: string, method: HttpMethod, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const errorText = await res.text().catch(() => '')
    throw new Error(errorText || `Request failed with status ${res.status}`)
  }

  return res.json()
}

export const api = {
  // Categories
  fetchCategories: () => request<any[]>('/categories', 'GET'),
  createCategory: (data: { name: string }) => request<any>('/categories', 'POST', data),
  deleteCategory: (id: string) => request<any>(`/categories/${id}`, 'DELETE'),

  // Purchases
  fetchPurchases: () => request<any[]>('/purchases', 'GET'),
  createPurchase: (data: {
    date: string
    categoryId: string
    categoryName: string
    quantity: number
    totalCost: number
    sellingPricePerItem: number
    supplier?: string
  }) => request<any>('/purchases', 'POST', data),
  deletePurchase: (id: string) => request<any>(`/purchases/${id}`, 'DELETE'),

  // Sales
  fetchSales: () => request<any[]>('/sales', 'GET'),
  createSale: (data: {
    date: string
    categoryId: string
    categoryName: string
    quantity: number
    sellingPricePerItem: number
  }) => request<any>('/sales', 'POST', data),
  deleteSale: (id: string) => request<any>(`/sales/${id}`, 'DELETE'),
  
  // Sales Analytics
  fetchWeeklySales: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    const queryString = params.toString()
    return request<any>(`/sales/analytics/weekly${queryString ? `?${queryString}` : ''}`, 'GET')
  },
  
  fetchDayOfWeekSales: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    const queryString = params.toString()
    return request<any>(`/sales/analytics/day-of-week${queryString ? `?${queryString}` : ''}`, 'GET')
  },
  
  fetchDailySales: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    const queryString = params.toString()
    return request<any>(`/sales/analytics/daily${queryString ? `?${queryString}` : ''}`, 'GET')
  },

  // Shop Closures
  fetchShopClosures: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    const queryString = params.toString()
    return request<any[]>(`/shop-closures${queryString ? `?${queryString}` : ''}`, 'GET')
  },
  createShopClosure: (data: {
    date: string
    reason: string
    description?: string
    isFullDay?: boolean
    closedHours?: number
  }) => request<any>('/shop-closures', 'POST', data),
  updateShopClosure: (id: string, data: {
    date?: string
    reason?: string
    description?: string
    isFullDay?: boolean
    closedHours?: number
  }) => request<any>(`/shop-closures/${id}`, 'PUT', data),
  deleteShopClosure: (id: string) => request<any>(`/shop-closures/${id}`, 'DELETE'),
  fetchShopClosureStats: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    const queryString = params.toString()
    return request<any>(`/shop-closures/stats${queryString ? `?${queryString}` : ''}`, 'GET')
  },
}


