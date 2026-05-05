import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 模組登錄項目 */
export interface ModuleRegistryItem {
  /** 模組 ID */
  id: string
  /** 模組顯示名稱 */
  label: string
  /** 模組版本 */
  version: string
  /** 模組支援的 hook 能力 */
  hooks: Record<string, boolean>
}

/** 取得已載入模組列表 API 回傳格式 */
export type GetModulesRes = ModuleRegistryItem[]

/**
 * 取得後端已載入的模組列表
 */
export async function getModules(): Promise<GetModulesRes> {
  const res = await axiosBase.get<PpsApiReturn<GetModulesRes>>('/modules')
  return res.data.data
}
