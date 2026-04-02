<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RegisterReq } from '@/domain/repository'
import { Button, Dialog, DialogPasswordToggle, TextInput } from '@/components'
import { useFundingDialogs } from '@/hooks'

const { dialogModel, closeDialogIf } = useFundingDialogs('register')

const props = defineProps<{
  onSubmit: (data: RegisterReq) => Promise<void>
}>()

const showRegisterPassword = ref(false)
const showRegisterConfirm = ref(false)
const formError = ref('')

const registerForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const clearFormError = () => {
  formError.value = ''
}

const submitRegister = async () => {
  if (!registerForm.email) {
    formError.value = '請輸入 Email'
    return
  }
  if (!registerForm.password) {
    formError.value = '請輸入密碼'
    return
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    formError.value = '兩次密碼不一致'
    return
  }

  formError.value = ''
  await props.onSubmit({ ...registerForm })
  closeDialogIf()
}
</script>

<template>
  <Dialog v-model="dialogModel" title="註冊新帳號" max-width="28.75rem" close-on-backdrop>
    <form class="flex flex-col gap-4.5" @submit.prevent="submitRegister">
      <p
        v-if="formError"
        class="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700"
        role="alert"
        aria-live="polite"
      >
        {{ formError }}
      </p>
      <label class="flex flex-col gap-1.5">
        <span class="text-[0.8125rem] font-semibold text-slate-600">Email</span>
        <TextInput
          v-model.trim="registerForm.email"
          type="email"
          autocomplete="email"
          @update:model-value="clearFormError"
        />
      </label>
      <label class="flex flex-col gap-1.5">
        <span class="text-[0.8125rem] font-semibold text-slate-600">密碼（8–12 碼，英數混合）</span>
        <div class="flex items-stretch gap-2">
          <TextInput
            v-model.trim="registerForm.password"
            :type="showRegisterPassword ? 'text' : 'password'"
            autocomplete="new-password"
            grow
            minlength="8"
            maxlength="12"
            @update:model-value="clearFormError"
          />
          <DialogPasswordToggle v-model="showRegisterPassword" />
        </div>
      </label>
      <label class="flex flex-col gap-1.5">
        <span class="text-[0.8125rem] font-semibold text-slate-600">確認密碼</span>
        <div class="flex items-stretch gap-2">
          <TextInput
            v-model.trim="registerForm.confirmPassword"
            :type="showRegisterConfirm ? 'text' : 'password'"
            autocomplete="new-password"
            grow
            @keydown.enter.prevent="submitRegister"
            @update:model-value="clearFormError"
          />
          <DialogPasswordToggle v-model="showRegisterConfirm" />
        </div>
      </label>
    </form>
    <template #footer>
      <Button variant="ghost" @click="closeDialogIf">取消</Button>
      <Button variant="primary" @click="submitRegister">註冊</Button>
    </template>
  </Dialog>
</template>
