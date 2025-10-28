import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { Produto } from '../api/productsApi'
import { RootState } from '../index'

interface FavoritesState {
  items: Produto[]
}

const initialState: FavoritesState = {
  items: []
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      const existingIndex = state.items.findIndex(
        (item) => item.id === produto.id
      )

      if (existingIndex >= 0) {
        // Remove dos favoritos se já estiver lá
        state.items.splice(existingIndex, 1)
      } else {
        // Adiciona aos favoritos se não estiver lá
        state.items.push(produto)
      }
    },
    clearFavorites: (state) => {
      state.items = []
    }
  }
})

// Selectors
export const selectFavoriteItems = (state: RootState) => state.favorites.items
export const selectFavoritesCount = createSelector(
  [selectFavoriteItems],
  (items) => items.length
)
export const selectIsFavorite = (id: number) =>
  createSelector([selectFavoriteItems], (items) =>
    items.some((item) => item.id === id)
  )

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
