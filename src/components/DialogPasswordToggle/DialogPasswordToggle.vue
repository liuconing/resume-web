<script setup lang="ts">
/** 搭配 Dialog 內表單使用的密碼顯示／隱藏切換（SVG 圖示） */
const visible = defineModel<boolean>({ required: true })

const handleClick = () => {
  visible.value = !visible.value
}
</script>

<template>
  <button
    type="button"
    class="dialog-password-toggle"
    :aria-pressed="visible"
    :aria-label="visible ? '隱藏密碼' : '顯示密碼'"
    @click="handleClick"
  >
    <!-- 密碼隱藏時：顯示「眼睛」提示可點擊顯示 -->
    <svg
      v-if="!visible"
      class="dialog-password-toggle__icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
    <!-- 密碼顯示時：顯示「眼睛斜線」提示可點擊隱藏 -->
    <svg
      v-else
      class="dialog-password-toggle__icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c3.162 0 6.129-1.126 8.5-3.05M6.228 6.228A10.45 10.45 0 0112 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
    </svg>
  </button>
</template>

<style scoped>
.dialog-password-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.75rem;
  min-height: 2.75rem;
  padding: 0;
  color: #6366f1;
  background: #eef2ff;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #e0e7ff;
  }

  &:focus-visible {
    outline: 2px solid #818cf8;
    outline-offset: 2px;
  }
}

.dialog-password-toggle__icon {
  width: 1.375rem;
  height: 1.375rem;
}
</style>
