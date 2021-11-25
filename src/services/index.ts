import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import { Router, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { showSnackbar } from '@/composables/useSnackbar'

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

function requestInterceptor(config: any) {
  const admin = useAdminStore()
  if (admin?.token)
    config.headers.Authorization = `Bearer ${admin.token}`

  return config
}

function responseErrorInterceptor(config: any, router: Router) {
  if (config?.response?.status === 401) {
    const isAdminRouter
      = router.currentRoute.value.path.includes('admin')
      && router.currentRoute.value.meta?.requiresAuth

    showSnackbar({ type: 'danger', title: 'Sessão expirada', description: 'Necessário fazer login' })

    if (isAdminRouter) {
      console.log('@@@ ok')
      router.push({ path: '/admin/signin' })
    }
  }

  return Promise.reject(config)
}

export function fetch({
  method = 'GET',
  baseURL = `${import.meta.env.VITE_APP_BASE_URL || ''}/`,
  path,
  ...data
}: FetchParams): Promise<AxiosResponse> {
  const axiosInstance = axios.create()
  const router = useRouter()

  axiosInstance.interceptors.request.use(requestInterceptor)

  axiosInstance.interceptors.response.use(
    config => Promise.resolve(config),
    config => responseErrorInterceptor(config, router),
  )

  return axiosInstance({
    ...data,
    method,
    baseURL,
    url: path,
  })
}
