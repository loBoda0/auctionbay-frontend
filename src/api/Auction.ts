import { apiRoutes } from "../constants/apiConstants"
import { apiRequest } from "./Api"

export const fetchAuctions = async () => {
  return apiRequest("get", apiRoutes.AUCTIONS)
}