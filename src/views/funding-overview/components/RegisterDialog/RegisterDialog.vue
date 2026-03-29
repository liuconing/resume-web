<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Button, Dialog, DialogPasswordToggle, TextInput } from '@/components'
import { useFundingDialogs } from '@/hooks'

const { dialogModel, closeDialogIf } = useFundingDialogs('register')

const props = defineProps<{
  onSubmit: () => Promise<void>
}>()

const showRegisterPassword = ref(false)
const showRegisterConfirm = ref(false)

const registerForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const submitRegister = async () => {
  if (
    !registerForm.email ||
    !registerForm.password ||
    registerForm.password !== registerForm.confirmPassword
  ) {
    return
  }

  await props.onSubmit()
  closeDialogIf()
}
</script>

<template>
  <Dialog v-model="dialogModel" title="註冊新帳號" max-width="28.75rem" close-on-backdrop>
    <form class="flex flex-col gap-4.5" @submit.prevent="submitRegister">
      <label class="flex flex-col gap-1.5">
        <span class="text-[0.8125rem] font-semibold text-slate-600">Email</span>
        <TextInput
          v-model.trim="registerForm.email"
          type="email"
          autocomplete="email"
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
