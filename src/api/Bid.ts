import { apiRoutes } from "../constants/apiConstants"
import { CreateBidFields } from "../hooks/useCreateBid"
import { apiRequest } from "./Api"

export const placeBid = async(auctionId: string, data: CreateBidFields) => {
  return apiRequest('post', apiRoutes.BIDS + auctionId, data)
}