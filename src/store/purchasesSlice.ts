import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../services/api'

export interface Purchase {
  id: string
  date: string
  categoryId: string
  categoryName: string
  quantity: number
  totalCost: number
  costPerItem: number
  sellingPricePerItem: number
  supplier?: string
}

interface PurchasesState {
  purchases: Purchase[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PurchasesState = {
  purchases: [],
  status: 'idle',
  error: null,
}

const mapPurchase = (p: any): Purchase => ({
  id: p._id || p.id,
  date: p.date,
  categoryId: p.categoryId?._id || p.categoryId,
  categoryName: p.categoryName || p.categoryId?.name || '',
  quantity: Number(p.quantity),
  totalCost: Number(p.totalCost),
  costPerItem: Number(p.costPerItem ?? p.totalCost / p.quantity),
  sellingPricePerItem: Number(p.sellingPricePerItem),
  supplier: p.supplier,
})

export const fetchPurchases = createAsyncThunk('purchases/fetchAll', async () => {
  const data = await api.fetchPurchases()
  return data.map(mapPurchase)
})

export const createPurchase = createAsyncThunk(
  'purchases/create',
  async (payload: {
    date: string
    categoryId: string
    categoryName: string
    quantity: number
    totalCost: number
    sellingPricePerItem: number
    supplier?: string
  }) => {
    const data = await api.createPurchase(payload)
    return mapPurchase(data)
  }
)

export const removePurchase = createAsyncThunk('purchases/delete', async (id: string) => {
  await api.deletePurchase(id)
  return id
})

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    addPurchase: (state, action: PayloadAction<Omit<Purchase, 'id' | 'costPerItem'>>) => {
      const newPurchase: Purchase = {
        ...action.payload,
        id: Date.now().toString(),
        costPerItem: action.payload.totalCost / action.payload.quantity,
      }
      state.purchases.push(newPurchase)
    },
    deletePurchase: (state, action: PayloadAction<string>) => {
      state.purchases = state.purchases.filter((p) => p.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchases.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.purchases = action.payload
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to load purchases'
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.purchases.unshift(action.payload)
      })
      .addCase(removePurchase.fulfilled, (state, action) => {
        state.purchases = state.purchases.filter((p) => p.id !== action.payload)
      })
  },
})

export const { addPurchase, deletePurchase } = purchasesSlice.actions
export default purchasesSlice.reducer




