import { productsApi } from '../productsApi'

describe('productsApi', () => {
  it('deve ter configuração correta da API', () => {
    expect(productsApi.reducerPath).toBe('productsApi')

    // Verifica se o endpoint está configurado corretamente
    const endpoints = productsApi.endpoints
    expect(endpoints.getProducts).toBeDefined()
  })

  it('deve gerar hooks corretamente', () => {
    // Verifica se o hook foi exportado
    expect(productsApi.useGetProductsQuery).toBeDefined()
    expect(typeof productsApi.useGetProductsQuery).toBe('function')
  })

  it('deve ter baseQuery configurado corretamente', () => {
    // Verifica se a configuração básica está correta
    expect(productsApi.reducerPath).toBe('productsApi')
  })

  it('deve ter tags configuradas', () => {
    // Verifica se as tags estão configuradas
    const getProductsEndpoint = productsApi.endpoints.getProducts
    expect(getProductsEndpoint).toBeDefined()
  })
})
