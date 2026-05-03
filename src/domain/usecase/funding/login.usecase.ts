import { loginRepo, type LoginReq, setLocalStorageRepo } from '@/domain/repository'

export interface LoginUsecaseDto extends LoginReq {}

export async function loginUsecase(req: LoginUsecaseDto): Promise<boolean> {
  const res = await loginRepo(req)
  if (res.ok) {
    const { token } = res.data
    setLocalStorageRepo(token)
    return true
  } else {
    return false
  }
}
