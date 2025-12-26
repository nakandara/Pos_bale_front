import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categoriesSlice'
import purchasesReducer from './purchasesSlice'
import salesReducer from './salesSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    purchases: purchasesReducer,
    sales: salesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch





