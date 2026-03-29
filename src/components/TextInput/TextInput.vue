<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export type TextInputSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    size?: TextInputSize
    /** 與並排元件（如密碼顯示鈕）同列時設為 true，等同 min-w-0 flex-1 */
    grow?: boolean
  }>(),
  {
    size: 'md',
    grow: false,
  },
)

defineOptions({ inheritAttrs: false })

const model = defineModel<string>({ default: '' })

const attrs = useAttrs()

const sizeClasses: Record<TextInputSize, string> = {
  sm: 'rounded-md px-2.5 py-2 text-sm',
  md: 'rounded-[0.625rem] px-3 py-2.5 text-[0.9375rem]',
  lg: 'rounded-lg px-4 py-3 text-base',
}

const baseClass =
  'border-2 border-slate-200 bg-slate-50 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white disabled:opacity-50'

const inputClass = computed(() =>
  [baseClass, sizeClasses[props.size], props.grow ? 'min-w-0 flex-1' : 'w-full'].join(' '),
)
</script>

<template>
  <input v-model="model" :class="inputClass" v-bind="attrs" />
</template>
