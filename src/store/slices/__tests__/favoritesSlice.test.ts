import favoritesReducer, {
  toggleFavorite,
  clearFavorites,
  selectFavoriteItems,
  selectFavoritesCount,
  selectIsFavorite
} from '../favoritesSlice'
import { Produto } from '../../api/productsApi'

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

describe('favoritesSlice', () => {
  const initialState = {
    items: []
  }

  it('deve retornar o estado inicial', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    )
  })

  it('deve adicionar produto aos favoritos quando não existe', () => {
    const actual = favoritesReducer(initialState, toggleFavorite(mockProduto1))
    expect(actual.items).toHaveLength(1)
    expect(actual.items[0]).toEqual(mockProduto1)
  })

  it('deve remover produto dos favoritos quando já existe', () => {
    const stateWithFavorite = {
      items: [mockProduto1]
    }

    const actual = favoritesReducer(
      stateWithFavorite,
      toggleFavorite(mockProduto1)
    )
    expect(actual.items).toHaveLength(0)
  })

  it('deve alternar corretamente entre adicionar e remover', () => {
    // Adicionar
    let state = favoritesReducer(initialState, toggleFavorite(mockProduto1))
    expect(state.items).toHaveLength(1)

    // Remover
    state = favoritesReducer(state, toggleFavorite(mockProduto1))
    expect(state.items).toHaveLength(0)

    // Adicionar novamente
    state = favoritesReducer(state, toggleFavorite(mockProduto1))
    expect(state.items).toHaveLength(1)
  })

  it('deve limpar todos os favoritos', () => {
    const stateWithFavorites = {
      items: [mockProduto1, mockProduto2]
    }

    const actual = favoritesReducer(stateWithFavorites, clearFavorites())
    expect(actual.items).toHaveLength(0)
  })

  describe('selectors', () => {
    const mockState = {
      favorites: {
        items: [mockProduto1, mockProduto2]
      },
      cart: { items: [] },
      productsApi: {}
    } as any

    it('selectFavoriteItems deve retornar todos os favoritos', () => {
      const result = selectFavoriteItems(mockState)
      expect(result).toEqual([mockProduto1, mockProduto2])
    })

    it('selectFavoritesCount deve retornar o número de favoritos', () => {
      const result = selectFavoritesCount(mockState)
      expect(result).toBe(2)
    })

    it('selectIsFavorite deve verificar se produto é favorito', () => {
      const isFavorite1 = selectIsFavorite(1)(mockState)
      const isFavorite3 = selectIsFavorite(3)(mockState)

      expect(isFavorite1).toBe(true)
      expect(isFavorite3).toBe(false)
    })
  })
})
