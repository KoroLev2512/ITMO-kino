import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://itmokino.ru/" }),
  endpoints: () => ({})
})
