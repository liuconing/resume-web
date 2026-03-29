import { useMutation as useReactQueryMutation, type MutationObserverOptions } from '@/lib/vue-query'

import { uuid } from '@/lib/uuid'
import { isEmpty } from '@/lib/lodash'
import { handleGlobalError, type GlobalError } from './useGlobalErrorHandler'

type MutationOptionsCore<TData, TParams> = MutationObserverOptions<TData, unknown, TParams, unknown>
export interface UseMutationOptions<TData, TParams> extends MutationOptionsCore<TData, TParams> {
  /** 是否啟用 Logger, 預設為: false  */
  enableLogger?: boolean
}
export function useMutation<TData, TParams = void>(
  fetchFn: (params: TParams) => Promise<TData>,
  options?: UseMutationOptions<TData, TParams>,
) {
  const enableLogger = options?.enableLogger ?? false

  const mutationFuncName = () => {
    return !isEmpty(fetchFn.name) ? fetchFn.name : uuid()
  }

  const { mutateAsync, data, isPending, isSuccess, isError } = useReactQueryMutation<
    TData,
    unknown,
    TParams
  >({
    mutationFn: async (params: TParams) => {
      let result
      let error

      try {
        result = await fetchFn(params)

        return result
      } catch (err: unknown) {
        handleGlobalError(err as GlobalError)
        throw err
      } finally {
        if (enableLogger) {
          console.groupCollapsed(
            `%cuseMutation: %c${mutationFuncName}`,
            'color: #000; font-size:10px; font-weight: 700; font-style: italic;',
            'color: #196c35; font-size:10px; font-weight: 700; font-style: italic;',
          )
          console.log({
            params,
            result,
            error,
          })
          console.groupEnd()
        }
      }
    },
    ...options,
  })

  return { mutate: mutateAsync, data, isPending, isSuccess, isError }
}
