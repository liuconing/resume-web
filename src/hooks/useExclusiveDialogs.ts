import { ref, reactive, computed, type ComputedRef, type Ref, type Reactive } from 'vue'

export interface UseExclusiveDialogsReturn<T extends string> {
  /** 目前開啟的 dialog id，無則為 null */
  active: Ref<T | null>
  /**
   * 與 `<Dialog v-model="dialogModels.xxx">` 綁定（keys 與 `ids` 一致）
   */
  dialogModels: Reactive<Record<T, ComputedRef<boolean>>>
  /** 與 `<Dialog v-model="dialogModel(id)">` 綁定（內部快取；模板請優先用 `dialogModels`） */
  dialogModel: (id: T) => ComputedRef<boolean>
  openDialog: (id: T) => void
  /** 關閉目前任一 dialog */
  closeDialog: () => void
  /** 僅在該 id 為目前開啟時關閉（適合取消／送出成功） */
  closeDialogIf: (id: T) => void
}

/**
 * 互斥 Dialog：同一時間只會開一個。
 * 新增 dialog 時只要在 `ids` 陣列加上識別字串，其餘用 `openDialog` / `dialogModel` 即可。
 *
 * @example
 * const { dialogModels, openDialog, closeDialogIf } = useExclusiveDialogs(['login', 'register'] as const)
 * // template: <Dialog v-model="dialogModels.login" /> @click="openDialog('register')"
 */
export function useExclusiveDialogs<const T extends readonly string[]>(
  ids: T,
): UseExclusiveDialogsReturn<T[number]> {
  type Id = T[number]
  const active = ref<Id | null>(null)
  const modelCache = new Map<Id, ComputedRef<boolean>>()

  const dialogModel = (id: Id): ComputedRef<boolean> => {
    if (!modelCache.has(id)) {
      modelCache.set(
        id,
        computed({
          get: () => active.value === id,
          set: (v: boolean) => {
            if (v) active.value = id
            else if (active.value === id) active.value = null
          },
        }),
      )
    }
    return modelCache.get(id)!
  }

  const dialogModels = reactive(
    ids.reduce(
      (acc, id: Id) => {
        acc[id] = dialogModel(id)
        return acc
      },
      {} as Record<Id, ComputedRef<boolean>>,
    ),
  )

  const openDialog = (id: Id) => {
    active.value = id
  }

  const closeDialog = () => {
    active.value = null
  }

  const closeDialogIf = (id: Id) => {
    if (active.value === id) active.value = null
  }

  return {
    active,
    dialogModels,
    dialogModel,
    openDialog,
    closeDialog,
    closeDialogIf,
  }
}
