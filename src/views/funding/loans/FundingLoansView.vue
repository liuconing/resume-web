<script setup lang="ts">
import { computed, watch } from 'vue'
import { ElNotification } from '@/lib/element-plus'
import { useFetch } from '@/hooks'
import { getFundingsLoansUsecase } from '@/domain/usecase'
import {
  formatDateTime,
  formatDisplayAmount as formatAmount,
  formatPercent as formatPct,
  readErrorMessage,
} from '@/utils'
import type {
  FundingsLoanItem,
  FundingsLoanSymbolSummary,
  GetFundingsLoansRes,
} from '@/domain/repository'

interface LoanSummaryCard {
  /** 卡片標題 */
  title: string
  /** 卡片主要顯示值 */
  value: string
  /** 補充說明 */
  hint?: string
}

const emptyLoansData: GetFundingsLoansRes = {
  activeLoans: 0,
  totalLoanedAmount: 0,
  todayInterest: 0,
  monthlyInterest: 0,
  bySymbol: [],
  loans: [],
}

const fundingsLoansQuery = useFetch(getFundingsLoansUsecase, undefined, {
  queryKey: ['fundingsLoans'],
})

const { data: loansDataRef, isFetching: loadingRef, refetch } = fundingsLoansQuery

const loansData = computed<GetFundingsLoansRes>(() => loansDataRef.value ?? emptyLoansData)

const loans = computed<FundingsLoanItem[]>(() => {
  return Array.isArray(loansData.value.loans) ? loansData.value.loans : []
})

const symbolSummaries = computed<FundingsLoanSymbolSummary[]>(() => {
  return Array.isArray(loansData.value.bySymbol) ? loansData.value.bySymbol : []
})

const hasLoans = computed(() => loans.value.length > 0)

const hasSymbolSummaries = computed(() => symbolSummaries.value.length > 0)

const summaryCards = computed<LoanSummaryCard[]>(() => {
  const summary = loansData.value
  return [
    {
      title: '進行中放款',
      value: String(summary.activeLoans),
    },
    {
      title: '放款總額',
      value: formatAmount({ value: summary.totalLoanedAmount }),
    },
    {
      title: '今日利息',
      value: formatAmount({ value: summary.todayInterest }),
      hint: '以目前 active loans 估算今日利息',
    },
    {
      title: '本月利息',
      value: formatAmount({ value: summary.monthlyInterest }),
      hint: '以今日利息估算 30 天利息',
    },
  ]
})

/**
 * 顯示錯誤通知。
 *
 * @param params - `title` 為通知標題，`error` 為錯誤來源。
 */
const notifyError = ({ title, error }: { title: string; error: unknown }): void => {
  ElNotification({
    title,
    message: readErrorMessage({ error }),
    type: 'error',
  })
}

/**
 * 重新取得放款資料。
 */
const handleRefetchLoans = async (): Promise<void> => {
  const result = await refetch()
  if (result.error) {
    return
  }
  ElNotification({
    title: '重新整理完成',
    message: '放款總覽資料已更新。',
    type: 'success',
  })
}

watch(
  () => fundingsLoansQuery.error.value,
  (error) => {
    if (!error) {
      return
    }
    notifyError({ title: '讀取失敗', error })
  },
)
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <h2>放款總覽</h2>
      <el-button type="primary" :loading="loadingRef" @click="handleRefetchLoans">
        重新整理
      </el-button>
    </div>

    <el-row :gutter="16">
      <el-col v-for="card in summaryCards" :key="card.title" :xs="24" :md="6">
        <el-card shadow="hover">
          <template #header>{{ card.title }}</template>
          <div class="value">{{ card.value }}</div>
          <p v-if="card.hint" class="hint">{{ card.hint }}</p>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never">
      <template #header>幣種統計</template>
      <el-empty v-if="!hasSymbolSummaries && !loadingRef" description="目前沒有幣種統計。" />
      <el-table v-else :data="symbolSummaries" stripe v-loading="loadingRef">
        <el-table-column prop="symbol" label="Symbol" min-width="120" />
        <el-table-column prop="activeLoans" label="筆數" min-width="100" />
        <el-table-column label="放款總額" min-width="140">
          <template #default="{ row }">{{ formatAmount({ value: row.totalLoanedAmount }) }}</template>
        </el-table-column>
        <el-table-column label="今日利息" min-width="140">
          <template #default="{ row }">{{ formatAmount({ value: row.todayInterest }) }}</template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never">
      <template #header>進行中放款列表</template>
      <el-empty v-if="!hasLoans && !loadingRef" description="目前沒有進行中的放款。" />
      <el-table v-else :data="loans" stripe v-loading="loadingRef">
        <el-table-column prop="id" label="ID" min-width="220" />
        <el-table-column prop="currency" label="幣種" width="120" />
        <el-table-column label="金額" min-width="130">
          <template #default="{ row }">{{ formatAmount({ value: row.amount }) }}</template>
        </el-table-column>
        <el-table-column label="利率(年化率)" min-width="140">
          <template #default="{ row }">{{ formatPct({ value: row.rateAprPct }) }}</template>
        </el-table-column>
        <el-table-column prop="remainingText" label="到期日(剩餘/總天數)" min-width="170" />
        <el-table-column label="借出時間" min-width="180">
          <template #default="{ row }">{{ formatDateTime({ value: row.lendAt }) }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 16px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.value {
  font-size: 24px;
  font-weight: 700;
}

.hint {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.6;
}
</style>
