import Header from './components/Header'
import Produtos from './containers/Produtos'

import { GlobalStyle } from './styles'

// Tipo movido para productsApi.ts
export type { Produto } from './store/api/productsApi'

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header />
        <Produtos />
      </div>
    </>
  )
}

export default App
