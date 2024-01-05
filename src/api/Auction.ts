import { apiRoutes } from "../constants/apiConstants"
import { apiRequest } from "./Api"

export const fetchAuctions = async () => {
  return apiRequest("get", apiRoutes.AUCTIONS)
}

export const fetchAuctionsByUser = async (type = '') => {
  return apiRequest("get", apiRoutes.MY_AUCTIONS + type)
}