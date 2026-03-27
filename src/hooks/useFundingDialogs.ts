import type { ComputedRef, Ref } from 'vue'
import { useExclusiveDialogs, type UseExclusiveDialogsReturn } from './useExclusiveDialogs'

/** Funding 區塊所有互斥 Dialog 的 id；新增 dialog 時只改這裡一處 */
export const FUNDING_DIALOG_IDS = ['login', 'register'] as const

export type FundingDialogId = (typeof FUNDING_DIALOG_IDS)[number]

let shared: UseExclusiveDialogsReturn<FundingDialogId> | null = null

function getShared(): UseExclusiveDialogsReturn<FundingDialogId> {
  if (!shared) {
    shared = useExclusiveDialogs(FUNDING_DIALOG_IDS)
  }
  return shared
}

export interface UseFundingDialogsScopedReturn {
  dialogModels: UseExclusiveDialogsReturn<FundingDialogId>['dialogModels']
  /** 等同 `dialogModels[yourId]`，方便 `v-model="dialogModel"` */
  dialogModel: ComputedRef<boolean>
  closeDialogIf: () => void
  openDialog: () => void
  closeDialog: () => void
  active: Ref<FundingDialogId | null>
}

export function useFundingDialogs(): UseExclusiveDialogsReturn<FundingDialogId>
export function useFundingDialogs<K extends FundingDialogId>(id: K): UseFundingDialogsScopedReturn
export function useFundingDialogs(
  id?: FundingDialogId,
): UseExclusiveDialogsReturn<FundingDialogId> | UseFundingDialogsScopedReturn {
  const ctx = getShared()

  if (id === undefined) {
    return ctx
  }

  if (!FUNDING_DIALOG_IDS.includes(id as FundingDialogId)) {
    throw new Error(`[useFundingDialogs] 未知的 dialog id: ${String(id)}`)
  }

  return {
    dialogModels: ctx.dialogModels,
    dialogModel: ctx.dialogModel(id),
    closeDialogIf: () => ctx.closeDialogIf(id),
    openDialog: () => ctx.openDialog(id),
    closeDialog: ctx.closeDialog,
    active: ctx.active,
  }
}
