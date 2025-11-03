import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { Produto } from '../api/productsApi'
import { RootState } from '../index'

interface CartState {
  items: Produto[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      const existingItem = state.items.find((item) => item.id === produto.id)

      if (!existingItem) {
        // Adiciona o produto ao carrinho apenas se não existir
        state.items.push(produto)
      }
      // Não fazemos nada se o item já existir (evita alertas desnecessários)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.length
)
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.preco, 0)
)
export const selectIsInCart = (id: number) =>
  createSelector([selectCartItems], (items) =>
    items.some((item) => item.id === id)
  )

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
