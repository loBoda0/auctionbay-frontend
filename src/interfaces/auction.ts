import { Bid } from "./bid"

export interface Auction {
  id: string
  created_at: Date,
  updated_at: Date,
  title: string
  description: string
  starting_price: number,
  end_date: string,
  auctioner: string,
  image: string
  bids: Bid[]
}