import apiHandler from './api'
const api = import.meta.env.VITE_API_KEY

export const callFriendlyStoreURL = `${api}/friendly_store`
export const callFriendlyStore = () =>
  apiHandler({
    url: callFriendlyStoreURL,
    method: 'GET'
  })
