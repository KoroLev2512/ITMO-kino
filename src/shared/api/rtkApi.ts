import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.itmokino.ru/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: () => ({})
})
