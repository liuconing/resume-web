import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

export const baseURL = 'https://data.moenv.gov.tw/api/v2/'
// Create a new Axios instance
const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 60 * 1000,
  withCredentials: false
})

// Set up an interceptor to intercept all requests
instance.interceptors.request.use(
  async (config) => {
    // config can be modified before sending the request
    // Add an authentication token to the request
    return config
  },
  (error) => {
    // Handle errors when an error occurs before sending the request
    return error
  }
)

// Set up an interceptor to intercept all responses
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // After receiving the response, the response can be modified
    return response
  },
  (error) => {
    // const { reason, msg, priority } = error?.response?.data ?? {}
    // Perform error handling, such as displaying error messages or redirecting to an error page
    // throw Error(error)
    return Promise.reject(error)
  }
)

export default instance
