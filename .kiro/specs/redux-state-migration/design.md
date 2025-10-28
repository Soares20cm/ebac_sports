# Documento de Design - Migração para Redux

## Visão Geral

Este documento descreve o design técnico para migrar a aplicação EBAC Sports de gerenciamento de estado baseado em useState para Redux com Redux Toolkit. A migração manterá toda a funcionalidade existente enquanto centraliza o estado em um store Redux, implementa RTK Query para requisições da API e fornece melhor tipagem TypeScript.

## Arquitetura

### Arquitetura Atual
```
App.tsx (useState)
├── produtos: Produto[]
├── carrinho: Produto[]  
├── favoritos: Produto[]
└── fetch manual da API
```

### Nova Arquitetura Redux
```
Redux Store
├── productsApi (RTK Query)
├── cartSlice
├── favoritesSlice
└── Typed Hooks (useAppSelector, useAppDispatch)
```

## Componentes e Interfaces

### 1. Store Redux (src/store/index.ts)

**Responsabilidades:**
- Configurar o store principal com Redux Toolkit
- Integrar RTK Query API
- Exportar tipos tipados para RootState e AppDispatch
- Configurar middleware para RTK Query

**Interface:**
```typescript
export interface RootState {
  cart: CartState
  favorites: FavoritesState
  productsApi: ReturnType<typeof productsApi.reducer>
}

export type AppDispatch = typeof store.dispatch
```

### 2. Products API (src/store/api/productsApi.ts)

**Responsabilidades:**
- Gerenciar requisições para a API de produtos
- Implementar cache automático
- Fornecer estados de loading e error
- Tipagem completa das respostas da API

**Endpoints:**
- `getProducts`: Busca todos os produtos da API EBAC Sports

**Interface:**
```typescript
export interface Produto {
  id: number
  nome: string
  preco: number
  imagem: string
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-ebac.vercel.app/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Produto[], void>()
  })
})
```

### 3. Cart Slice (src/store/slices/cartSlice.ts)

**Responsabilidades:**
- Gerenciar estado do carrinho de compras
- Implementar lógica de adição de produtos
- Prevenir duplicatas no carrinho
- Calcular total de itens e valor

**Estado:**
```typescript
interface CartState {
  items: Produto[]
}
```

**Actions:**
- `addToCart(produto: Produto)`: Adiciona produto ao carrinho se não existir
- `removeFromCart(id: number)`: Remove produto do carrinho
- `clearCart()`: Limpa todo o carrinho

**Selectors:**
- `selectCartItems`: Retorna todos os itens do carrinho
- `selectCartItemsCount`: Retorna número de itens no carrinho
- `selectCartTotal`: Retorna valor total do carrinho

### 4. Favorites Slice (src/store/slices/favoritesSlice.ts)

**Responsabilidades:**
- Gerenciar estado dos produtos favoritos
- Implementar toggle de favoritos
- Verificar se produto está nos favoritos

**Estado:**
```typescript
interface FavoritesState {
  items: Produto[]
}
```

**Actions:**
- `toggleFavorite(produto: Produto)`: Adiciona ou remove produto dos favoritos
- `clearFavorites()`: Limpa todos os favoritos

**Selectors:**
- `selectFavoriteItems`: Retorna todos os favoritos
- `selectFavoritesCount`: Retorna número de favoritos
- `selectIsFavorite(id: number)`: Verifica se produto é favorito

### 5. Typed Hooks (src/store/hooks.ts)

**Responsabilidades:**
- Fornecer hooks tipados para useSelector e useDispatch
- Garantir type safety em toda a aplicação

**Hooks:**
```typescript
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

## Modelos de Dados

### Produto
```typescript
interface Produto {
  id: number
  nome: string
  preco: number
  imagem: string
}
```

### Estado do Carrinho
```typescript
interface CartState {
  items: Produto[]
}
```

### Estado dos Favoritos
```typescript
interface FavoritesState {
  items: Produto[]
}
```

## Tratamento de Erros

### RTK Query
- Estados de loading automáticos
- Tratamento de erros de rede
- Retry automático para requisições falhadas
- Cache invalidation quando necessário

### Slices
- Validação de payload nas actions
- Estados consistentes mesmo com ações inválidas
- Logs de erro para debugging

### Componentes
- Fallbacks para estados de loading
- Mensagens de erro amigáveis ao usuário
- Manutenção da funcionalidade mesmo com falhas parciais

## Estratégia de Testes

### Testes de Slices
- Testar reducers com diferentes actions
- Verificar estados iniciais corretos
- Validar selectors retornam dados esperados

### Testes de RTK Query
- Mock de requisições da API
- Testar estados de loading e error
- Verificar cache behavior

### Testes de Integração
- Testar fluxo completo de adicionar ao carrinho
- Verificar toggle de favoritos funciona corretamente
- Testar persistência de estado durante navegação

### Testes de Componentes
- Verificar componentes renderizam com dados do Redux
- Testar dispatch de actions através da UI
- Validar que props não são mais necessárias para estado

## Migração dos Componentes

### App.tsx
**Antes:**
- Gerencia estado local com useState
- Passa props para componentes filhos
- Faz fetch manual da API

**Depois:**
- Remove todo useState relacionado a dados
- Usa hooks tipados do Redux
- RTK Query gerencia dados da API automaticamente

### Header/index.tsx
**Antes:**
- Recebe `itensNoCarrinho` e `favoritos` como props
- Calcula valor total localmente

**Depois:**
- Usa `useAppSelector` para acessar estado do Redux
- Remove dependência de props para dados
- Usa selectors para cálculos derivados

### Produto/index.tsx
**Antes:**
- Recebe callbacks `aoComprar` e `favoritar` como props
- Recebe `estaNosFavoritos` como prop

**Depois:**
- Usa `useAppDispatch` para disparar actions
- Usa `useAppSelector` para verificar status de favorito
- Remove dependência de props para lógica de negócio

### Produtos.tsx
**Antes:**
- Recebe todos os dados como props
- Passa callbacks para componentes filhos

**Depois:**
- Usa RTK Query hook para buscar produtos
- Remove prop drilling
- Componentes filhos acessam Redux diretamente

## Considerações de Performance

### RTK Query
- Cache automático reduz requisições desnecessárias
- Background refetching para dados atualizados
- Optimistic updates onde apropriado

### Selectors
- Memoização automática com createSelector quando necessário
- Evitar re-renders desnecessários
- Selectors granulares para componentes específicos

### Bundle Size
- Redux Toolkit é otimizado para tamanho
- Tree shaking remove código não utilizado
- Lazy loading de slices se necessário

## Compatibilidade e Migração

### Estratégia de Migração
1. Configurar store Redux sem quebrar funcionalidade existente
2. Migrar um slice por vez (produtos → carrinho → favoritos)
3. Atualizar componentes gradualmente
4. Remover código useState antigo após validação

### Backward Compatibility
- Manter interfaces de componentes durante transição
- Gradual removal de props não utilizadas
- Testes garantem funcionalidade idêntica

### Rollback Plan
- Manter código useState comentado durante migração inicial
- Feature flags para alternar entre implementações
- Testes A/B se necessário