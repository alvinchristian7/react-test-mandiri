import { baseApi } from "./index"

export const fetchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query<object, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetDataQuery } = fetchApi