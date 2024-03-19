import apiHandler from './api'

export const callFriendlyStoreURL = 'http://192.168.50.24:3000/api/friendly_store'
export const callFriendlyStore = () =>
  apiHandler({
    url: callFriendlyStoreURL,
    method: 'GET'
  })
