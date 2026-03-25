<script setup lang="ts">
/**
 * 表單內密碼顯示／隱藏請搭配 `DialogPasswordToggle.vue`（Heroicons 風格 SVG）
 */
import { watch, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    /** 例如 28rem、440px */
    maxWidth?: string
    /** 點擊遮罩是否關閉 */
    closeOnBackdrop?: boolean
  }>(),
  {
    title: '',
    maxWidth: '28rem',
    closeOnBackdrop: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleClose = () => {
  emit('update:modelValue', false)
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) handleClose()
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) handleClose()
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeydown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeydown)
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
        role="presentation"
      >
        <div
          class="absolute inset-0 bg-slate-900/55 backdrop-blur-[2px]"
          aria-hidden="true"
          @click="handleBackdropClick"
        />
        <div
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'dialog-title' : undefined"
          class="relative z-10 w-full rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10 outline-none"
          :style="{ maxWidth }"
          @click.stop
        >
          <header
            class="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"
          >
            <h2
              v-if="title || $slots.title"
              id="dialog-title"
              class="text-lg font-semibold text-slate-800"
            >
              <slot name="title">{{ title }}</slot>
            </h2>
            <span v-else class="flex-1" />
            <button
              type="button"
              class="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="關閉"
              @click="handleClose"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </header>
          <div class="max-h-[min(70vh,32rem)] overflow-y-auto px-5 py-4">
            <slot />
          </div>
          <footer
            v-if="$slots.footer"
            class="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 px-5 py-4"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-enter-active .relative,
.dialog-leave-active .relative {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .relative,
.dialog-leave-to .relative {
  transform: translateY(0.5rem) scale(0.98);
  opacity: 0;
}
</style>
