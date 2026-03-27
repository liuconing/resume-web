import { useExclusiveDialogs } from './useExclusiveDialogs'

/** Funding 頁所有互斥 Dialog 的 id；新增時只改這裡一處 */
export const FUNDING_DIALOG_IDS = ['login', 'register'] as const

export function useFundingDialogs() {
  return useExclusiveDialogs(FUNDING_DIALOG_IDS)
}

export type FundingDialogId = (typeof FUNDING_DIALOG_IDS)[number]
