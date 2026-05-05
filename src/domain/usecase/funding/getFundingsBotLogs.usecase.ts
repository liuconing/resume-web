import { getFundingsBotLogsRepo, type GetFundingsBotLogsReq } from '@/domain/repository'

export async function getFundingsBotLogsUsecase(req?: GetFundingsBotLogsReq) {
  return getFundingsBotLogsRepo(req as GetFundingsBotLogsReq)
}
