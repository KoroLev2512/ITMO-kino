import { OrderData } from "../types";
import { rtkApi } from "./rtkApi";

const orderApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateSeatsById: build.mutation<OrderData, OrderData>({
      query: ({ id, buy_seats }) => ({
        method: 'PATCH',
        url: `seats/${id}`,
        body: {
          buy_seats
        }
      })
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateSeatsByIdMutation } = orderApi
