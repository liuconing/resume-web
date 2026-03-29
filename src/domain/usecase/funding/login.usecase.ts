import { loginRepo, type LoginReq, type LoginRes, setLocalStorageRepo } from '@/domain/repository'

export interface LoginUsecaseDto extends LoginReq {}

export async function loginUsecase(req: LoginUsecaseDto): Promise<LoginRes> {
  const res = await loginRepo(req)
  const { token } = res
  setLocalStorageRepo(token)
  return res
}
