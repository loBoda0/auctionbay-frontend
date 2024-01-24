import { apiRoutes } from "../constants/apiConstants"
import { CreateBidFields } from "../hooks/useCreateBid"
import { Bid } from "../interfaces/bid"
import { apiRequest } from "./Api"

export const placeBid = async(auctionId: string, data: CreateBidFields) => {
  return apiRequest<CreateBidFields, Bid>('post', apiRoutes.BIDS + auctionId, data)
}