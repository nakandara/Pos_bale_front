import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../services/api'

export interface Category {
  id: string
  name: string
  createdAt: string
}

interface CategoriesState {
  categories: Category[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  status: 'idle',
  error: null,
}

const mapCategory = (c: any): Category => ({
  id: c._id || c.id,
  name: c.name,
  createdAt: c.createdAt || new Date().toISOString(),
})

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const data = await api.fetchCategories()
  return data.map(mapCategory)
})

export const createCategory = createAsyncThunk('categories/create', async (payload: { name: string }) => {
  const data = await api.createCategory(payload)
  return mapCategory(data)
})

export const removeCategory = createAsyncThunk('categories/delete', async (id: string) => {
  await api.deleteCategory(id)
  return id
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Fallback local actions (not used when API is connected)
    addCategory: (state, action: PayloadAction<{ name: string }>) => {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: action.payload.name,
        createdAt: new Date().toISOString(),
      }
      state.categories.push(newCategory)
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((cat) => cat.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to load categories'
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.unshift(action.payload)
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat.id !== action.payload)
      })
  },
})

export const { addCategory, deleteCategory } = categoriesSlice.actions
export default categoriesSlice.reducer





