import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'

type FetchParams = {
  baseURL?: string
  path?: string
  headers?: AxiosRequestHeaders | { Authorization: string }
  data?: JSON | Record<string, unknown> | FormData
  params?: any
  method?: AxiosRequestConfig['method']
}

export type ErrorData = {
  response: {
    data: {
      code?: number
      message: string
      field?: string
      rule?: string
    }
  }
}

export function fetch({
  method = 'GET',
  baseURL = `${import.meta.env.VITE_APP_BASE_URL || ''}/`,
  path,
  ...data
}: FetchParams): Promise<AxiosResponse> {
  const axiosInstance = axios.create()

  axiosInstance.interceptors.response.use(
    config => Promise.resolve(config),
    config => Promise.reject(config),
  )

  return axiosInstance({
    ...data,
    method,
    baseURL,
    url: path,
  })
}
