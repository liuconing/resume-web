import { loginRepo, type LoginReq, setLocalStorageRepo } from '@/domain/repository'

export interface LoginUsecaseDto extends LoginReq {}

export async function loginUsecase(req: LoginUsecaseDto): Promise<boolean> {
  try {
    const data = await loginRepo(req)
    setLocalStorageRepo(data.token)
    return true
  } catch {
    return false
  }
}
