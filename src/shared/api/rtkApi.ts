import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://itmokino.ru:3001/" }),
  endpoints: () => ({})
})
