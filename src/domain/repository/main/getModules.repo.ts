import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface ModuleRegistryItem {
  // 模組 ID。
  id: string
  // 模組顯示名稱。
  label: string
  // 模組版本。
  version: string
  // 模組支援的 hook 能力。
  hooks: Record<string, boolean>
}

export type GetModulesRes = ModuleRegistryItem[]

export const getModulesRepo = async (): Promise<GetModulesRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetModulesRes>>('/modules')
  return res.data.data
}
