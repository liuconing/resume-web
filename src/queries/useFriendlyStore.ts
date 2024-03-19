import type { Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { callFriendlyStore, callFriendlyStoreURL } from '../api/friendlyStore'

export const useFriendlyStore = (selectItemRef: Ref<string>) => {
  return useQuery({
    queryKey: [callFriendlyStoreURL, selectItemRef],
    queryFn: async () => {
      const res = await callFriendlyStore()
      return res.data
    },
    select: (data) => {
      const map = data.filter(
        (item: { [key: string]: string }) => item[selectItemRef.value] === '1' && item
      )
      return map
    },
    enabled: selectItemRef.value !== '請選擇友善項目'
  })
}
