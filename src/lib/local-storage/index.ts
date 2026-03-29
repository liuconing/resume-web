import type { LocalStorage as ILocalStorage } from './interface'

async function getItem<T>(key: string): Promise<T | null> {
  try {
    // @ts-ignore
    const value = localStorage.getItem(key)

    if (value !== null && value !== undefined) {
      return JSON.parse(value)
    }

    return null
  } catch (error) {
    return null
  }
}

async function setItem(key: string, value: any) {
  try {
    const stringifiedValue = JSON.stringify(value)
    // @ts-ignore
    localStorage.setItem(key, stringifiedValue)

    return true
  } catch (e) {
    return false
  }
}

async function removeItem(key: string) {
  // @ts-ignore
  localStorage.removeItem(key)
}

async function clear() {
  // @ts-ignore
  localStorage.clear()
}

export const LocalStorage: ILocalStorage = {
  getItem,
  setItem,
  removeItem,
  clear,
}
