import { baseApi } from '@/shared/api/baseApi';
import type { Product } from '@/shared/types/products.types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductById: builder.query<Product, number>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
  }),
});

export const { useGetProductByIdQuery } = productsApi;
