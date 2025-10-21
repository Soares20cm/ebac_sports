import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // Slices serão adicionados aqui
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
