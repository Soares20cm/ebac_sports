import Produto from '../components/Produto'
import { useGetProductsQuery } from '../store/api/productsApi'

import * as S from './styles'

const ProdutosComponent = () => {
  const { data: produtos, error, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return <div>Carregando produtos...</div>
  }

  if (error) {
    return <div>Erro ao carregar produtos. Tente novamente.</div>
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto key={produto.id} produto={produto} />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
