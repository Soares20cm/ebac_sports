# Plano de Implementação

- [x] 1. Configurar estrutura base do Redux


  - Criar hooks tipados para useSelector e useDispatch
  - Configurar store Redux com middleware RTK Query
  - Definir tipos TypeScript para RootState e AppDispatch
  - _Requisitos: 1.2, 5.1, 5.2_

- [ ] 2. Implementar RTK Query para produtos
  - [x] 2.1 Criar API service para produtos usando RTK Query


    - Definir endpoint para buscar produtos da API EBAC Sports
    - Configurar baseQuery com URL da API
    - Implementar tipagem TypeScript para resposta da API
    - _Requisitos: 2.1, 2.2, 5.5_
  
  - [x] 2.2 Integrar RTK Query API no store Redux


    - Adicionar productsApi reducer ao store
    - Configurar middleware do RTK Query
    - _Requisitos: 2.5, 1.2_

- [ ] 3. Criar slice do carrinho de compras
  - [x] 3.1 Implementar cartSlice com Redux Toolkit


    - Definir estado inicial do carrinho
    - Criar action addToCart com validação de duplicatas
    - Implementar action removeFromCartp
    - Criar action clearCart
    - _Requisitos: 3.1, 3.2, 3.3, 5.4_
  
  - [x] 3.2 Criar selectors para o carrinho


    - Implementar selectCartItems
    - Criar selectCartItemsCount para contagem de itens
    - Implementar selectCartTotal para cálculo do valor total
    - _Requisitos: 3.4, 5.3_
  
  - [x] 3.3 Integrar cartSlice no store Redux


    - Adicionar cart reducer ao store
    - _Requisitos: 1.2_

- [ ] 4. Criar slice dos favoritos
  - [x] 4.1 Implementar favoritesSlice com Redux Toolkit


    - Definir estado inicial dos favoritos
    - Criar action toggleFavorite para adicionar/remover favoritos
    - Implementar action clearFavorites
    - _Requisitos: 4.1, 4.2, 4.3, 5.4_
  
  - [x] 4.2 Criar selectors para favoritos


    - Implementar selectFavoriteItems
    - Criar selectFavoritesCount para contagem
    - Implementar selectIsFavorite para verificar status de favorito
    - _Requisitos: 4.4, 5.3_
  
  - [x] 4.3 Integrar favoritesSlice no store Redux


    - Adicionar favorites reducer ao store
    - _Requisitos: 1.2_

- [ ] 5. Migrar componente App.tsx
  - [x] 5.1 Substituir useState por hooks Redux


    - Remover useState para produtos, carrinho e favoritos
    - Implementar useGetProductsQuery do RTK Query
    - Usar useAppSelector para acessar estado do Redux
    - _Requisitos: 1.1, 1.3, 2.3_
  
  - [x] 5.2 Remover prop drilling do App.tsx

    - Remover props de carrinho e favoritos do Header
    - Remover callbacks de adicionarAoCarrinho e favoritar do Produtos
    - Simplificar estrutura de props
    - _Requisitos: 1.5_

- [ ] 6. Migrar componente Header
  - [x] 6.1 Implementar acesso direto ao Redux no Header


    - Usar useAppSelector para acessar itens do carrinho
    - Usar useAppSelector para acessar favoritos
    - Remover dependência de props para dados
    - _Requisitos: 1.3, 1.5_
  
  - [x] 6.2 Implementar cálculo de valor total com selector

    - Usar selectCartTotal ou calcular valor total no componente
    - Manter formatação de moeda existente
    - _Requisitos: 3.4_

- [ ] 7. Migrar componente Produto
  - [x] 7.1 Implementar dispatch de actions no componente Produto


    - Usar useAppDispatch para disparar addToCart
    - Usar useAppDispatch para disparar toggleFavorite
    - Remover dependência de callbacks via props
    - _Requisitos: 1.4, 3.1, 4.1_
  
  - [x] 7.2 Implementar verificação de favorito com Redux

    - Usar useAppSelector com selectIsFavorite
    - Remover prop estaNosFavoritos
    - Manter lógica de exibição do botão de favorito
    - _Requisitos: 4.4, 1.3_

- [ ] 8. Migrar container Produtos
  - [x] 8.1 Implementar busca de produtos com RTK Query


    - Usar useGetProductsQuery hook
    - Implementar tratamento de loading e error states
    - Remover prop produtos
    - _Requisitos: 2.1, 2.3, 2.4_
  
  - [x] 8.2 Remover prop drilling no container Produtos

    - Remover props de favoritos, adicionarAoCarrinho e favoritar
    - Simplificar interface do componente
    - _Requisitos: 1.5_

- [ ] 9. Configurar Provider Redux na aplicação
  - [x] 9.1 Envolver App com Provider do Redux


    - Importar Provider do react-redux
    - Configurar Provider com store no index.tsx ou App.tsx
    - _Requisitos: 1.1_

- [ ] 10. Implementar testes para Redux
  - [x] 10.1 Criar testes para cartSlice


    - Testar actions addToCart, removeFromCart, clearCart
    - Testar selectors do carrinho
    - _Requisitos: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 10.2 Criar testes para favoritesSlice


    - Testar action toggleFavorite e clearFavorites
    - Testar selectors dos favoritos
    - _Requisitos: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 10.3 Criar testes para RTK Query



    - Testar endpoint getProducts
    - Testar estados de loading e error
    - _Requisitos: 2.1, 2.3_