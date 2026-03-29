import {
  getLocalStorageRepo,
  setLocalStorageRepo,
  clearLocalStorageRepo,
} from '@/domain/repository'

/**
 * 取得 localStorage
 */
export async function getLocalStorageUsecase(): Promise<any> {
  return await getLocalStorageRepo()
}

/**
 * 設定 localStorage
 */
export const setLocalStorageUsecase = (data: any) => {
  setLocalStorageRepo(data)
}
/**
 * 移除 localStorage
 */
export const removeLocalStorageUsecase = () => {
  clearLocalStorageRepo()
}
