import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer } from '../slices'
import { orderReducer } from '../slices'
import { rtkApi } from '../api'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    order: orderReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
