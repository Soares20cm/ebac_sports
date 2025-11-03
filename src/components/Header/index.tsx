import * as S from './styles'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  selectCartItemsCount,
  selectCartTotal,
  clearCart
} from '../../store/slices/cartSlice'
import { selectFavoritesCount } from '../../store/slices/favoritesSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const cartItemsCount = useAppSelector(selectCartItemsCount)
  const favoritesCount = useAppSelector(selectFavoritesCount)
  const cartTotal = useAppSelector(selectCartTotal)

  const handleClearCart = () => {
    if (cartItemsCount > 0 && window.confirm('Deseja limpar o carrinho?')) {
      dispatch(clearCart())
    }
  }

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{favoritesCount} favoritos</span>
        <img
          src={cesta}
          onClick={handleClearCart}
          style={{ cursor: cartItemsCount > 0 ? 'pointer' : 'default' }}
          title={cartItemsCount > 0 ? 'Clique para limpar o carrinho' : ''}
        />
        <span>
          {cartItemsCount} itens, valor total: {paraReal(cartTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
