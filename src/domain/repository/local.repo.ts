import { LocalStorage } from '@/lib/local-storage'

const STORAGE_KEY_MAP = {
  SESSION: 'login/localStorage',
}

/**
 * 設定登入 token 至 localStorage
 * @param data - 要儲存的 token 資料
 */
export function setLocalStorage(data: any) {
  LocalStorage.setItem(STORAGE_KEY_MAP.SESSION, data)
}

/**
 * 取得 localStorage 中的登入 token
 */
export function getLocalStorage() {
  return LocalStorage.getItem(STORAGE_KEY_MAP.SESSION)
}

/**
 * 清除 localStorage 中的登入 token
 */
export const clearLocalStorage = () => {
  LocalStorage.removeItem(STORAGE_KEY_MAP.SESSION)
}
