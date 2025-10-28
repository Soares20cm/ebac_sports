import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal
} from '../cartSlice'
import { Produto } from '../../api/productsApi'

// Mock do alert para os testes
global.alert = jest.fn()

const mockProduto1: Produto = {
  id: 1,
  nome: 'Produto 1',
  preco: 100,
  imagem: 'imagem1.jpg'
}

const mockProduto2: Produto = {
  id: 2,
  nome: 'Produto 2',
  preco: 200,
  imagem: 'imagem2.jpg'
}

describe('cartSlice', () => {
  const initialState = {
    items: []
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve retornar o estado inicial', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('deve adicionar produto ao carrinho', () => {
    const actual = cartReducer(initialState, addToCart(mockProduto1))
    expect(actual.items).toHaveLength(1)
    expect(actual.items[0]).toEqual(mockProduto1)
  })

  it('deve exibir alerta quando produto já existe no carrinho', () => {
    const stateWithItem = {
      items: [mockProduto1]
    }

    cartReducer(stateWithItem, addToCart(mockProduto1))
    expect(global.alert).toHaveBeenCalledWith('Item já adicionado')
  })

  it('deve remover produto do carrinho', () => {
    const stateWithItems = {
      items: [mockProduto1, mockProduto2]
    }

    const actual = cartReducer(stateWithItems, removeFromCart(1))
    expect(actual.items).toHaveLength(1)
    expect(actual.items[0]).toEqual(mockProduto2)
  })

  it('deve limpar todo o carrinho', () => {
    const stateWithItems = {
      items: [mockProduto1, mockProduto2]
    }

    const actual = cartReducer(stateWithItems, clearCart())
    expect(actual.items).toHaveLength(0)
  })

  describe('selectors', () => {
    const mockState = {
      cart: {
        items: [mockProduto1, mockProduto2]
      },
      favorites: { items: [] },
      productsApi: {}
    } as any

    it('selectCartItems deve retornar todos os itens do carrinho', () => {
      const result = selectCartItems(mockState)
      expect(result).toEqual([mockProduto1, mockProduto2])
    })

    it('selectCartItemsCount deve retornar o número de itens', () => {
      const result = selectCartItemsCount(mockState)
      expect(result).toBe(2)
    })

    it('selectCartTotal deve retornar o valor total', () => {
      const result = selectCartTotal(mockState)
      expect(result).toBe(300) // 100 + 200
    })
  })
})
