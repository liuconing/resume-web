import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useQuery, type UseQueryOptions, type QueryKey } from '@/lib/vue-query'
import { uuid } from '@/lib/uuid'
import { handleGlobalError, type GlobalError } from './useGlobalErrorHandler'

type UseQueryBaseOptions<TData, TError> = Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  'initialData' | 'queryFn' | 'queryKey'
>

export interface UseFetchOptions<TData, TError> extends UseQueryBaseOptions<TData, TError> {
  /** 是否啟用 Logger，預設為 false */
  enableLogger?: boolean
  /** 是否顯示 Loading Spinner（需自行實作 useSpinner） */
  enableSpinner?: boolean
  /** 預填 query 的初始資料 */
  initialData?: () => TData
  /** 用於識別 query 的 cache key */
  queryKey?: QueryKey
  /** query 成功取得資料時觸發 */
  onSuccess?: (data: TData) => void
  /** query 發生錯誤時觸發 */
  onError?: (error: TError) => void
  /** query 完成（成功或失敗）時觸發 */
  onSettled?: (data: TData | undefined, error: TError | undefined) => void
}

const formatError = (err: unknown): Error => (err instanceof Error ? err : new Error(String(err)))

export function useFetch<TData, TParams, TError extends Error = Error>(
  queryFn: (param: TParams) => Promise<TData>,
  params: MaybeRefOrGetter<TParams>,
  options?: UseFetchOptions<TData, TError>,
) {
  const queryKey = computed(() => {
    const currentParams = toValue(params)
    return options?.queryKey ? [...options.queryKey, currentParams] : [uuid(), currentParams]
  })

  return useQuery({
    ...options,
    queryKey,
    queryFn: async () => {
      let result: TData | undefined
      let error: TError | undefined
      const currentParams = toValue(params)

      try {
        result = await queryFn(currentParams)
        options?.onSuccess?.(result)
        return result
      } catch (err: unknown) {
        handleGlobalError(err as GlobalError)
        error = formatError(err) as TError
        options?.onError?.(error)
        if (!options?.onError) {
          console.error('[useFetch]', error)
        }
        throw error
      } finally {
        options?.onSettled?.(result!, error)
        // if (options?.enableLogger) {
        //   console.groupCollapsed(`useFetch: ${queryFn.name || 'anonymous'}`)
        //   console.log({ params: currentParams, result, error })
        //   console.groupEnd()
        // }
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  })
}
