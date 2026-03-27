<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Dialog, DialogPasswordToggle } from '@/components'
import { useFundingDialogs } from '@/hooks'

const { dialogModel, closeDialogIf } = useFundingDialogs('login')

const props = defineProps<{
  onSubmit: () => Promise<void>
}>()

const showLoginPassword = ref(false)

const loginForm = reactive({
  email: '',
  password: '',
})

const submitLogin = async () => {
  if (!loginForm.email || !loginForm.password) return
  await props.onSubmit()
  closeDialogIf()
}
</script>

<template>
  <Dialog v-model="dialogModel" title="使用者登入" max-width="27.5rem" close-on-backdrop>
    <form class="auth-form" @submit.prevent="submitLogin">
      <label class="field">
        <span class="field-label">Email</span>
        <input
          v-model.trim="loginForm.email"
          type="email"
          autocomplete="email"
          class="field-input"
        />
      </label>
      <label class="field">
        <span class="field-label">密碼</span>
        <div class="field-password">
          <input
            v-model.trim="loginForm.password"
            :type="showLoginPassword ? 'text' : 'password'"
            autocomplete="current-password"
            class="field-input"
            @keydown.enter.prevent="submitLogin"
          />
          <DialogPasswordToggle v-model="showLoginPassword" />
        </div>
      </label>
    </form>
    <template #footer>
      <button type="button" class="btn btn-ghost" @click="closeDialogIf">取消</button>
      <button type="button" class="btn btn-primary" @click="submitLogin">登入</button>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.field-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #475569;
}

.field-input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 0.9375rem;
  color: #0f172a;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 0.625rem;
  outline: none;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;

  &:focus {
    border-color: #818cf8;
    background: #fff;
  }
}

.field-password {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;

  .field-input {
    flex: 1;
    min-width: 0;
  }
}
</style>
