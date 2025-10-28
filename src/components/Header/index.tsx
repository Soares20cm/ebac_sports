import * as S from './styles'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'
import { useAppSelector } from '../../store/hooks'
import {
  selectCartItemsCount,
  selectCartTotal
} from '../../store/slices/cartSlice'
import { selectFavoritesCount } from '../../store/slices/favoritesSlice'

const Header = () => {
  const cartItemsCount = useAppSelector(selectCartItemsCount)
  const favoritesCount = useAppSelector(selectFavoritesCount)
  const cartTotal = useAppSelector(selectCartTotal)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{favoritesCount} favoritos</span>
        <img src={cesta} />
        <span>
          {cartItemsCount} itens, valor total: {paraReal(cartTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
