import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../services/api'

export interface Sale {
  id: string
  date: string
  categoryId: string
  categoryName: string
  quantity: number
  sellingPricePerItem: number
  totalAmount: number
}

interface SalesState {
  sales: Sale[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SalesState = {
  sales: [],
  status: 'idle',
  error: null,
}

const mapSale = (s: any): Sale => ({
  id: s._id || s.id,
  date: s.date,
  categoryId: s.categoryId?._id || s.categoryId,
  categoryName: s.categoryName || s.categoryId?.name || '',
  quantity: Number(s.quantity),
  sellingPricePerItem: Number(s.sellingPricePerItem),
  totalAmount: Number(s.totalAmount ?? s.quantity * s.sellingPricePerItem),
})

export const fetchSales = createAsyncThunk('sales/fetchAll', async () => {
  const data = await api.fetchSales()
  return data.map(mapSale)
})

export const createSale = createAsyncThunk(
  'sales/create',
  async (payload: {
    date: string
    categoryId: string
    categoryName: string
    quantity: number
    sellingPricePerItem: number
  }) => {
    const data = await api.createSale(payload)
    return mapSale(data)
  }
)

export const removeSale = createAsyncThunk('sales/delete', async (id: string) => {
  await api.deleteSale(id)
  return id
})

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addSale: (state, action: PayloadAction<Omit<Sale, 'id' | 'totalAmount'>>) => {
      const newSale: Sale = {
        ...action.payload,
        id: Date.now().toString(),
        totalAmount: action.payload.quantity * action.payload.sellingPricePerItem,
      }
      state.sales.push(newSale)
    },
    deleteSale: (state, action: PayloadAction<string>) => {
      state.sales = state.sales.filter((s) => s.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.sales = action.payload
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to load sales'
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.sales.unshift(action.payload)
      })
      .addCase(removeSale.fulfilled, (state, action) => {
        state.sales = state.sales.filter((s) => s.id !== action.payload)
      })
  },
})

export const { addSale, deleteSale } = salesSlice.actions
export default salesSlice.reducer





