import { axiosBase } from '@/lib/axios'

export interface RegisterReq {
  email: string
  password: string
  confirmPassword: string
}

export const registerRepo = async (req: RegisterReq): Promise<void> => {
  const res = await axiosBase.post('/fundings/auth/register', req)
  return res.data
}
