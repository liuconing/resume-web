<script setup lang="ts">
import { computed } from 'vue'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
  },
)

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-9 gap-1.5 rounded-lg px-4 text-xs',
  md: 'min-h-11 gap-2 rounded-xl px-6 text-sm',
  lg: 'min-h-12 gap-2 rounded-xl px-8 text-base',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-0 bg-linear-to-br from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/35 hover:shadow-xl hover:shadow-indigo-500/45',
  secondary:
    'border-2 border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50',
  ghost: 'border-0 text-slate-500 hover:bg-slate-100 hover:text-slate-700',
}

const rootClass = computed(() =>
  [
    'inline-flex cursor-pointer items-center justify-center font-semibold transition',
    'active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-65',
    sizeClasses[props.size],
    variantClasses[props.variant],
  ].join(' '),
)
</script>

<template>
  <button :type="type" :disabled="disabled" :class="rootClass">
    <slot />
  </button>
</template>
