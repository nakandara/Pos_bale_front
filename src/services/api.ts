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
}


