import { ref, onMounted, onUnmounted } from 'vue'

export const useWindowWidth = () => {
  const windowWidth = ref<number>(window.innerWidth)
  const windowHeight = ref<number>(window.innerHeight)
  const updateWindowSize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }
  onMounted(() => {
    window.addEventListener('resize', updateWindowSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
  })

  return { windowWidth, windowHeight }
}
