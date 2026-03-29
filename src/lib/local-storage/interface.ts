export interface LocalStorage {
  getItem<T = any>(key: string): Promise<T | null>;
  setItem(key: string, value: any): Promise<boolean>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}
