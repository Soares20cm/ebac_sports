import { Produto as ProdutoType } from '../../store/api/productsApi'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addToCart, selectIsInCart } from '../../store/slices/cartSlice'
import {
  toggleFavorite,
  selectIsFavorite
} from '../../store/slices/favoritesSlice'

type Props = {
  produto: ProdutoType
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useAppDispatch()
  const estaNosFavoritos = useAppSelector(selectIsFavorite(produto.id))
  const estaNoCarrinho = useAppSelector(selectIsInCart(produto.id))

  const handleAddToCart = () => {
    if (!estaNoCarrinho) {
      dispatch(addToCart(produto))
    }
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(produto))
  }

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={handleToggleFavorite} type="button">
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar
        onClick={handleAddToCart}
        type="button"
        disabled={estaNoCarrinho}
        style={{
          opacity: estaNoCarrinho ? 0.6 : 1,
          cursor: estaNoCarrinho ? 'not-allowed' : 'pointer'
        }}
      >
        {estaNoCarrinho ? 'Já no carrinho' : 'Adicionar ao carrinho'}
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
