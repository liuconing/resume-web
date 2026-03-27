<script setup lang="ts">
import { useFundingDialogs } from '@/hooks'
import { LoginDialog, RegisterDialog } from './components'

const { dialogModels, openDialog } = useFundingDialogs()

const handelLogin = async () => {
  await new Promise((r) => setTimeout(r, 600))
}

const handelRegister = async () => {
  await new Promise((r) => setTimeout(r, 600))
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
        <button type="button" class="btn btn-primary" @click="openDialog('login')">登入</button>
        <button type="button" class="btn btn-secondary" @click="openDialog('register')">
          註冊
        </button>
      </div>
    </section>

    <section class="funding-features">
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3>策略化放貸</h3>
        <p>可設定資金幣種、最小放貸金額、利率與期數，讓機器人持續運行。</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
        </div>
        <h3>即時市場行情</h3>
        <p>快速檢視各市場參考利率，掌握不同幣種資金投放機會。</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
        </div>
        <h3>可視化資產報表</h3>
        <p>在管理頁查看總資產、閒置資金與利息收入，清楚掌握營運成效。</p>
      </article>
    </section>

    <LoginDialog v-model="dialogModels.login" :onSubmit="handelLogin" />
    <RegisterDialog v-model="dialogModels.register" :onSubmit="handelRegister" />
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
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 0.75rem;

  svg {
    width: 1.375rem;
    height: 1.375rem;
    flex-shrink: 0;
  }
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
