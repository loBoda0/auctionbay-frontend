import { User } from "./user"

export interface Bid {
  id: string
  created_at: Date,
  updated_at: Date,
  bid_amount: number
  bidder: User
}