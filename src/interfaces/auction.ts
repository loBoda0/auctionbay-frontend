import { Bid } from "./bid"
import { User } from "./user"

export interface Auction {
  id: string
  created_at: Date,
  updated_at: Date,
  title: string
  description: string
  starting_price: number,
  end_date: string,
  auctioner: User,
  image: string
  bids: Bid[]
  winner: User
}