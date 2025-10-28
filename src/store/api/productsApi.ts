import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Produto {
  id: number
  nome: string
  preco: number
  imagem: string
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-ebac.vercel.app/api/'
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Produto[], void>({
      query: () => 'ebac_sports',
      providesTags: ['Product']
    })
  })
})

export const { useGetProductsQuery } = productsApi
