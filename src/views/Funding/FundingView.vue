<script setup lang="ts">
import { ref, reactive } from 'vue'
import Dialog from '@/components/Dialog.vue'
import DialogPasswordToggle from '@/components/DialogPasswordToggle.vue'

const loginVisible = ref(false)
const registerVisible = ref(false)
const loginLoading = ref(false)
const registerLoading = ref(false)

const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showRegisterConfirm = ref(false)

const loginForm = reactive({
  email: '',
  password: '',
})

const registerForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const sanitizeAuthField = (form: Record<string, string>, key: string) => {
  const v = form[key] ?? ''
  form[key] = String(v).replace(/[<>]/g, '').trim()
}

const openLoginDialog = () => {
  registerVisible.value = false
  loginVisible.value = true
}

const openRegisterDialog = () => {
  loginVisible.value = false
  registerVisible.value = true
}

const submitLogin = async () => {
  if (!loginForm.email || !loginForm.password) return
  loginLoading.value = true
  try {
    await new Promise((r) => setTimeout(r, 600))
    loginVisible.value = false
  } finally {
    loginLoading.value = false
  }
}

const submitRegister = async () => {
  if (
    !registerForm.email ||
    !registerForm.password ||
    registerForm.password !== registerForm.confirmPassword
  ) {
    return
  }
  registerLoading.value = true
  try {
    await new Promise((r) => setTimeout(r, 700))
    registerVisible.value = false
  } finally {
    registerLoading.value = false
  }
}
</script>

<template>
  <div class="funding-page">
    <div class="funding-bg" aria-hidden="true" />

    <section class="funding-hero">
      <p class="funding-badge">DeFi · 自動化</p>
      <h1 class="funding-title">智能放貸機器人</h1>
      <p class="funding-lead">
        以自動化策略管理資金配置，追蹤市場利率與放貸績效，協助你在不同幣種市場中提升資金使用效率。
      </p>
      <div class="funding-actions">
        <button type="button" class="btn btn-primary" @click="openLoginDialog">
          登入
        </button>
        <button type="button" class="btn btn-secondary" @click="openRegisterDialog">
          註冊
        </button>
      </div>
    </section>

    <section class="funding-features">
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">◎</div>
        <h3>策略化放貸</h3>
        <p>可設定資金幣種、最小放貸金額、利率與期數，讓機器人持續運行。</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">◇</div>
        <h3>即時市場行情</h3>
        <p>快速檢視各市場參考利率，掌握不同幣種資金投放機會。</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">▣</div>
        <h3>可視化資產報表</h3>
        <p>在管理頁查看總資產、閒置資金與利息收入，清楚掌握營運成效。</p>
      </article>
    </section>

    <Dialog v-model="loginVisible" title="使用者登入" max-width="27.5rem">
      <form class="auth-form" @submit.prevent="submitLogin">
        <label class="field">
          <span class="field-label">Email</span>
          <input
            v-model="loginForm.email"
            type="email"
            autocomplete="email"
            class="field-input"
            @input="sanitizeAuthField(loginForm, 'email')"
          />
        </label>
        <label class="field">
          <span class="field-label">密碼</span>
          <div class="field-password">
            <input
              v-model="loginForm.password"
              :type="showLoginPassword ? 'text' : 'password'"
              autocomplete="current-password"
              class="field-input"
              @input="sanitizeAuthField(loginForm, 'password')"
              @keydown.enter.prevent="submitLogin"
            />
            <DialogPasswordToggle v-model="showLoginPassword" />
          </div>
        </label>
      </form>
      <template #footer>
        <button type="button" class="btn btn-ghost" @click="loginVisible = false">
          取消
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="loginLoading"
          @click="submitLogin"
        >
          <span v-if="loginLoading" class="btn-spinner" aria-hidden="true" />
          {{ loginLoading ? '登入中…' : '登入' }}
        </button>
      </template>
    </Dialog>

    <Dialog v-model="registerVisible" title="註冊新帳號" max-width="28.75rem">
      <form class="auth-form" @submit.prevent="submitRegister">
        <label class="field">
          <span class="field-label">Email</span>
          <input
            v-model="registerForm.email"
            type="email"
            autocomplete="email"
            class="field-input"
            @input="sanitizeAuthField(registerForm, 'email')"
          />
        </label>
        <label class="field">
          <span class="field-label">密碼（8–12 碼，英數混合）</span>
          <div class="field-password">
            <input
              v-model="registerForm.password"
              :type="showRegisterPassword ? 'text' : 'password'"
              autocomplete="new-password"
              class="field-input"
              minlength="8"
              maxlength="12"
              @input="sanitizeAuthField(registerForm, 'password')"
            />
            <DialogPasswordToggle v-model="showRegisterPassword" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">確認密碼</span>
          <div class="field-password">
            <input
              v-model="registerForm.confirmPassword"
              :type="showRegisterConfirm ? 'text' : 'password'"
              autocomplete="new-password"
              class="field-input"
              @input="sanitizeAuthField(registerForm, 'confirmPassword')"
              @keydown.enter.prevent="submitRegister"
            />
            <DialogPasswordToggle v-model="showRegisterConfirm" />
          </div>
        </label>
      </form>
      <template #footer>
        <button type="button" class="btn btn-ghost" @click="registerVisible = false">
          取消
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="registerLoading"
          @click="submitRegister"
        >
          <span v-if="registerLoading" class="btn-spinner" aria-hidden="true" />
          {{ registerLoading ? '註冊中…' : '註冊' }}
        </button>
      </template>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
.funding-page {
  position: relative;
  min-height: 100vh;
  padding: 2.5rem 1.25rem 4rem;
  overflow: hidden;
}

.funding-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.18), transparent),
    radial-gradient(ellipse 60% 40% at 100% 50%, rgba(14, 165, 233, 0.12), transparent),
    linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  pointer-events: none;
}

.funding-hero,
.funding-features {
  position: relative;
  z-index: 1;
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
}

.funding-hero {
  text-align: center;
  padding-bottom: 3rem;
}

.funding-badge {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.35rem 0.85rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #4338ca;
  background: rgba(99, 102, 241, 0.12);
  border-radius: 9999px;
}

.funding-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.funding-lead {
  max-width: 36rem;
  margin: 0 auto 2rem;
  font-size: 1.0625rem;
  line-height: 1.65;
  color: #475569;
}

.funding-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    transform: scale(0.98);
  }
}

.btn-primary {
  color: #fff;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);

  &:not(:disabled):hover {
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.45);
  }
}

.btn-secondary {
  color: #334155;
  background: #fff;
  border: 2px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);

  &:not(:disabled):hover {
    border-color: #cbd5e1;
    background: #f8fafc;
  }
}

.btn-ghost {
  color: #64748b;
  background: transparent;

  &:hover {
    background: #f1f5f9;
    color: #334155;
  }
}

.btn-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.funding-features {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: #64748b;
  }
}

.feature-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 0.75rem;
}

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
