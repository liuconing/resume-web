import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from '@/domain/repository'

/**
 * 取得 localStorage 中的登入 token
 */
export async function getLocalStorageUsecase(): Promise<any> {
  return getLocalStorage()
}

/**
 * 設定登入 token 至 localStorage
 * @param data - 要儲存的 token 資料
 */
export const setLocalStorageUsecase = (data: any) => {
  setLocalStorage(data)
}

/**
 * 清除 localStorage 中的登入 token
 */
export const removeLocalStorageUsecase = async () => {
  clearLocalStorage()
}
