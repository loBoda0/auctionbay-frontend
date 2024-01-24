import { apiRoutes } from "../constants/apiConstants"
import { CreateAuctionFields } from "../hooks/useAddEditAuction"
import { Auction } from "../interfaces/auction"
import { apiRequest } from "./Api"

export const fetchAuctions = async () => {
  return apiRequest("get", apiRoutes.AUCTIONS)
}

export const getAuctionById = async (id: string | undefined) => {
  return apiRequest("get", apiRoutes.MY_AUCTIONS + id)
}

export const fetchAuctionsByUser = async (type = '') => {
  return apiRequest("get", apiRoutes.MY_AUCTIONS + type)
}

export const postAuction = async (data: CreateAuctionFields) => {
  return apiRequest<CreateAuctionFields, Auction>("post", apiRoutes.AUCTIONS, data)
}

export const updateAuction = async (auctionId: string, data: CreateAuctionFields) => {
  return apiRequest<CreateAuctionFields, Auction>("patch", apiRoutes.MY_AUCTIONS + auctionId, data)
}

export const auctionUpdateImage = async (auctionId: string, data: FormData) => {
  return apiRequest("post", apiRoutes.AUCTIONS_IMAGE + auctionId, data)
}

export const removeAuction = async (auctionId: string) => {
  return apiRequest("delete", apiRoutes.MY_AUCTIONS + auctionId)
}