import { adminLoginRepo, type AdminLoginReq } from '@/domain/repository'

export async function adminLoginUsecase(req: AdminLoginReq) {
  return adminLoginRepo(req)
}
