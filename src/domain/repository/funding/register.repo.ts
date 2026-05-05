import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface RegisterReq {
  email: string
  password: string
  confirmPassword: string
}

export const registerRepo = async (req: RegisterReq): Promise<void> => {
  await axiosBase.post<PpsApiReturn<unknown>>('/fundings/auth/register', req)
}
