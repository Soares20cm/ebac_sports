# Documento de Requisitos

## Introdução

Este documento define os requisitos para migrar a aplicação de e-commerce EBAC Sports do gerenciamento de estado baseado em useState do React para Redux com Redux Toolkit. A migração centralizará o gerenciamento de estado para produtos, carrinho de compras e favoritos, implementando RTK Query para busca de dados da API.

## Glossário

- **Aplicacao_EBAC_Sports**: A aplicação React de e-commerce para produtos esportivos
- **Store_Redux**: O store centralizado de gerenciamento de estado usando Redux Toolkit
- **Slice_Carrinho**: Slice do Redux que gerencia o estado e operações do carrinho de compras
- **Slice_Produtos**: Slice do Redux que gerencia o estado e operações dos produtos
- **Slice_Favoritos**: Slice do Redux que gerencia o estado e operações dos favoritos do usuário
- **API_RTK_Query**: Serviço Redux Toolkit Query para lidar com requisições da API
- **Entidade_Produto**: Estrutura de dados representando um produto esportivo com id, nome, preço e imagem
- **Interface_Usuario**: Os componentes React que interagem com o store Redux

## Requisitos

### Requisito 1

**História do Usuário:** Como desenvolvedor, quero substituir useState por Redux Toolkit para gerenciamento de estado, para que a aplicação tenha gerenciamento de estado centralizado e previsível.

#### Critérios de Aceitação

1. A Aplicacao_EBAC_Sports DEVE usar Store_Redux ao invés de estado local do componente para todos os dados da aplicação
2. QUANDO a aplicação inicializar, O Store_Redux DEVE conter slices para produtos, carrinho e favoritos
3. A Aplicacao_EBAC_Sports DEVE usar o hook useSelector para acessar dados do estado do Store_Redux
4. A Aplicacao_EBAC_Sports DEVE usar o hook useDispatch para disparar mudanças de estado no Store_Redux
5. A Interface_Usuario DEVE manter funcionalidade idêntica após a migração para Redux

### Requisito 2

**História do Usuário:** Como desenvolvedor, quero implementar RTK Query para requisições da API, para que a busca de dados seja tratada eficientemente com cache e estados de carregamento.

#### Critérios de Aceitação

1. A API_RTK_Query DEVE lidar com todas as requisições HTTP para o endpoint de produtos
2. QUANDO produtos forem solicitados, A API_RTK_Query DEVE buscar dados de 'https://api-ebac.vercel.app/api/ebac_sports'
3. A API_RTK_Query DEVE fornecer estados de carregamento e erro para requisições da API
4. A API_RTK_Query DEVE fazer cache dos dados de produtos buscados para evitar requisições desnecessárias
5. O Slice_Produtos DEVE integrar com API_RTK_Query para gerenciamento de dados

### Requisito 3

**História do Usuário:** Como usuário, quero adicionar produtos ao meu carrinho de compras, para que eu possa comprar múltiplos itens juntos.

#### Critérios de Aceitação

1. QUANDO um usuário clicar em adicionar ao carrinho, O Slice_Carrinho DEVE adicionar a Entidade_Produto ao estado do carrinho
2. SE uma Entidade_Produto já existir no carrinho, ENTÃO O Slice_Carrinho DEVE exibir uma mensagem de alerta
3. O Slice_Carrinho DEVE manter um array de itens Entidade_Produto no carrinho
4. A Interface_Usuario DEVE exibir o número atual de itens no carrinho
5. O Slice_Carrinho DEVE prevenir entradas duplicadas de Entidade_Produto no carrinho

### Requisito 4

**História do Usuário:** Como usuário, quero marcar produtos como favoritos, para que eu possa facilmente encontrar produtos que me interessam mais tarde.

#### Critérios de Aceitação

1. QUANDO um usuário clicar no botão de favorito, O Slice_Favoritos DEVE alternar o status de favorito da Entidade_Produto
2. SE uma Entidade_Produto já estiver favoritada, ENTÃO O Slice_Favoritos DEVE removê-la dos favoritos
3. SE uma Entidade_Produto não estiver favoritada, ENTÃO O Slice_Favoritos DEVE adicioná-la aos favoritos
4. O Slice_Favoritos DEVE manter um array de itens Entidade_Produto favoritados
5. A Interface_Usuario DEVE exibir o número atual de itens favoritados

### Requisito 5

**História do Usuário:** Como desenvolvedor, quero integração adequada do TypeScript com Redux, para que a aplicação tenha segurança de tipos e melhor experiência de desenvolvimento.

#### Critérios de Aceitação

1. O Store_Redux DEVE exportar tipos tipados RootState e AppDispatch
2. A Aplicacao_EBAC_Sports DEVE usar hooks tipados para useSelector e useDispatch
3. QUANDO acessar o estado, A Interface_Usuario DEVE ter suporte completo ao intellisense do TypeScript
4. O Slice_Carrinho DEVE definir interfaces TypeScript adequadas para todas as formas de estado
5. A API_RTK_Query DEVE fornecer respostas tipadas para todos os endpoints da API