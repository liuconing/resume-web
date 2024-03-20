import { onBeforeMount } from 'vue'

/**
 * Custom hook to determine if the user is accessing the website from a desktop device.
 * @returns An object containing the `isDesktop` boolean value.
 */
export const useNavigator = () => {
  onBeforeMount(() => {
    const userAgent = navigator.userAgent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
    if (isMobile) {
      alert('請使用PC訪問此網站為最佳體驗')
    }
  })
  return
}
