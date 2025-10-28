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

      if (existingItem) {
        // Se o produto já existe no carrinho, exibe alerta
        alert('Item já adicionado')
      } else {
        // Adiciona o produto ao carrinho
        state.items.push(produto)
      }
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

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
