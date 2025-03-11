import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Seat } from "../types";

export interface OrderState {
  seats: Seat[]
}

const initialState: OrderState = {
  seats: []
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addSeat: (state, action: PayloadAction<Seat>) => {
      state.seats.push(action.payload)
    },
    deleteSeat: (state, action: PayloadAction<Seat>) => {
      const { row, seat } = action.payload
      const filteredSeats = state.seats.filter((data) => data.seat !== seat || data.row !== row)
      state.seats = filteredSeats
    },
    clearOrder: (state) => {
      state.seats = []
    },
  }
})

export const { reducer: orderReducer } = orderSlice
export const { addSeat, deleteSeat, clearOrder } = orderSlice.actions
