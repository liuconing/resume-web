<script setup lang="ts">
import { ref, reactive } from 'vue'
import { type LoginParamsDto } from '@/domain/usecase'
import { Button, Dialog, DialogPasswordToggle, TextInput } from '@/components'
import { useFundingDialogs } from '@/hooks'

const props = defineProps<{
  onSubmit: (data: LoginParamsDto) => Promise<void>
}>()

const { dialogModel, closeDialogIf } = useFundingDialogs('login')

const showLoginPassword = ref(false)

const loginFormBase = {
  email: '',
  password: '',
}

const loginForm = reactive({ ...loginFormBase })

const resetLoginForm = () => {
  Object.assign(loginForm, loginFormBase)
}

const submitLogin = async () => {
  if (!loginForm.email || !loginForm.password) return
  await props.onSubmit(loginForm)
  resetLoginForm()
  closeDialogIf()
}
</script>

<template>
  <Dialog v-model="dialogModel" title="使用者登入" max-width="27.5rem" close-on-backdrop>
    <form class="flex flex-col gap-4.5" @submit.prevent="submitLogin">
      <label class="flex flex-col gap-1.5">
        <span class="text-[0.8125rem] font-semibold text-slate-600">Email (測試帳號: admin)</span>
        <TextInput v-model.trim="loginForm.email" type="email" autocomplete="email" />
      </label>
      <label class="flex flex-col gap-1.5">
        <span class="text-[0.8125rem] font-semibold text-slate-600">密碼 (測試密碼: abcd123)</span>
        <div class="flex items-stretch gap-2">
          <TextInput
            v-model.trim="loginForm.password"
            :type="showLoginPassword ? 'text' : 'password'"
            autocomplete="current-password"
            grow
            @keydown.enter.prevent="submitLogin"
          />
          <DialogPasswordToggle v-model="showLoginPassword" />
        </div>
      </label>
    </form>
    <template #footer>
      <Button variant="ghost" @click="closeDialogIf">取消</Button>
      <Button variant="primary" @click="submitLogin">登入</Button>
    </template>
  </Dialog>
</template>
