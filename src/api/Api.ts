import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { refreshToken } from "./User"

const instance = Axios.create()

instance.interceptors.response.use(
  (response) => {
    console.log(response.data)
    return response
  },
  async (error) => {
    console.error(error)

    const originalRequest = error.config

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await refreshToken()

        if (data) {
          document.cookie = `access_token${data} path=/`
          return instance(originalRequest)
        }
      } catch (refreshError) {
        console.error(refreshError)
        // Handle the error that occurred during token refresh if needed
      }
    }

    return Promise.reject(error)
  }
)

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders
  } & AxiosRequestConfig,
) {
  try {
    const response = await Axios.request<R>({
      baseURL: import.meta.env.VITE_REACT_APP_API_URL,
      url: path,
      method: method,
      data: input,
      headers: {
        ...options?.headers,
      },
      withCredentials: true
    })
    console.log(response)
    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error)
    return error.response
  }
}

export * from './User'
export * from './Auction'
export * from './Bid'