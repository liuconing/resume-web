import { axiosBase } from '@/lib/axios'

export interface LoginReq {
  email: string
  password: string
}

export interface LoginRes {
  token: string
  user: {
    id: string
    email: string
    createdAt: string
    updatedAt: string
  }
}

export const loginRepo = async (req: LoginReq): Promise<LoginRes> => {
  const res = await axiosBase.post('/fundings/auth/login', req)
  return res.data
}
