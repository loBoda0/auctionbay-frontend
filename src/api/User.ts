import { apiRoutes } from "../constants/apiConstants"
import { LoginUserFields } from "../hooks/react-hook-form/useLoginForm"
import { NewPasswordFields } from "../hooks/react-hook-form/useNewPassword"
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

export const logout = async () => {
  apiRequest("post", apiRoutes.SIGNUP)
}

export const updateUser = async (id: string, data: UpdateUserFields | UpdatePasswordFields) => {
  return apiRequest("patch", apiRoutes.UPDATE_USER + id, data)
}

export const updateAvatar = async (data: FormData) => {
  return apiRequest("post", apiRoutes.UPLOAD_AVATAR_IMAGE, data)
}

export const refreshToken = async () => {
  return apiRequest("get", apiRoutes.REFRESH_TOKEN)
}

export const forgottenPassword = async (data: { email: string }) => {
  return apiRequest("post", apiRoutes.FORGOT_PASSWORD, data)
}

export const setNewPassword = async (id: string | undefined, data: NewPasswordFields) => {
  return apiRequest("post", apiRoutes.FORGOT_PASSWORD + '/' + id, data)
}