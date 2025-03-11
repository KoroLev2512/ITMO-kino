import { Seat } from "./seat";

export interface OrderData {
  id: number,
  buy_seats: Seat[]
}
