import { apiRoutes } from "../constants/apiConstants"
import { LoginUserFields } from "../hooks/react-hook-form/useLoginForm"
import { RegisterUserFields } from "../hooks/react-hook-form/useRegisterForm"
import { apiRequest } from "./Api"

export const login = async (data: LoginUserFields) => {
  return apiRequest("post", apiRoutes.LOGIN, data)
}

export const register = async (data: RegisterUserFields) => {
  apiRequest("post", apiRoutes.SIGNUP, data)
}