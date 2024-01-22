import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import * as API from '../api/Api'

// Default instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  timeout: 10000,
  headers: {
      Authorization: undefined,
      'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
      return config
  },
  (error) => {
      return {
          error: error,
      }
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalConfig = error.config
    if (error?.response && error?.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true
      try {
        await API.refreshToken()
        return axiosInstance(originalConfig)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    if (error?.response?.status === 401) {
      return Promise.reject(error.response.data)
    }
    if (error?.response?.data) {
        return Promise.reject(error.response.data)
    }

      return Promise.reject(error)
  },
)

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders
  } & AxiosRequestConfig,
) {
  const response = await axiosInstance.request<R>({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    url: path,
    method: method,
    data: input,
    headers: {
        ...options?.headers,
      },
      withCredentials: true
    })
    return response
   
}

export * from './User'
export * from './Auction'
export * from './Bid'