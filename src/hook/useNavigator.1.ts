import { ref, onBeforeMount } from 'vue'

export const useNavigator = () => {
  const isDesktop = ref(false)

  onBeforeMount(() => {
    const userAgent = navigator.userAgent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
    isDesktop.value = !isMobile
  })

  return {
    isDesktop
  }
}
