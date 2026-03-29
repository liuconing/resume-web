import { LocalStorage } from '@/lib/local-storage'

const STORAGE_KEY_MAP = {
  SESSION: 'login/localStorage',
}

/** 設定 localStorage */
export function setLocalStorageRepo(data: any) {
  LocalStorage.setItem(STORAGE_KEY_MAP.SESSION, data)
}

/** 取得 localStorage */
export function getLocalStorageRepo() {
  return LocalStorage.getItem(STORAGE_KEY_MAP.SESSION)
}

/** 刪除 localStorage */
export const clearLocalStorageRepo = () => {
  LocalStorage.removeItem(STORAGE_KEY_MAP.SESSION)
}
