import axios from 'axios'
import { getLocalStorageUsecase } from '@/domain/usecase'

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080' + '/api',
})

axiosBase.interceptors.request.use((config) => {
  const token = getLocalStorageUsecase()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { axios, axiosBase }
