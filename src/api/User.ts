import { apiRoutes } from "../constants/apiConstants"
import { LoginUserFields } from "../hooks/react-hook-form/useLoginForm"
import { RegisterUserFields } from "../hooks/react-hook-form/useRegisterForm"
import { UpdatePasswordFields } from "../hooks/useUpdatePassword"
import { UpdateUserFields } from "../hooks/useUpdateUser"
import { apiRequest } from "./Api"

export const login = async (data: LoginUserFields) => {
  return apiRequest("post", apiRoutes.LOGIN, data)
}

export const register = async (data: RegisterUserFields) => {
  apiRequest("post", apiRoutes.SIGNUP, data)
}

export const updateUser = async (id: string, data: UpdateUserFields | UpdatePasswordFields) => {
  return apiRequest("patch", apiRoutes.UPDATE_USER + id, data)
}