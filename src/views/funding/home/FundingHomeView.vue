<script setup lang="ts">
import { onMounted, watch, reactive, ref } from 'vue'
import { useFetch } from '@/hooks'
import { BigNumber } from '@/lib/bigNumber'
import { getFundingsOverviewUsecase } from '@/domain/usecase'

const { data: overviewData } = useFetch(getFundingsOverviewUsecase, undefined)
const loading = ref(false)
const overview = reactive({
  totalAssets: 0,
  assets: [] as { currency: string; amount: number }[],
  idleFunds: 0,
  interestIncome: 0,
})

const formatAmount = (value: number) => {
  return BigNumber(value || 0).toFormat(2, BigNumber.ROUND_HALF_UP)
}

watch(overviewData, (newData) => {
  console.log(newData)
})

const handleReload = async () => {}
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <h2>資金總覽</h2>
      <el-button type="primary" :loading="loading" @click="handleReload">重新整理</el-button>
    </div>

    <el-row :gutter="16">
      <el-col :xs="24" :md="8">
        <el-card shadow="hover">
          <template #header>總資產</template>
          <div class="value">{{ formatAmount(overview.totalAssets) }}</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card shadow="hover">
          <template #header>閒置資金</template>
          <div class="value">{{ formatAmount(overview.idleFunds) }}</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card shadow="hover">
          <template #header>利息收入</template>
          <div class="value">{{ formatAmount(overview.interestIncome) }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" class="table-card">
      <template #header>幣種資產明細</template>
      <el-table :data="overview.assets" stripe v-loading="loading">
        <el-table-column prop="currency" label="幣種" width="140" />
        <el-table-column label="金額">
          <template #default="{ row }">{{ formatAmount(row.amount) }}</template>
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
  font-size: 28px;
  font-weight: 700;
}

.table-card {
  margin-top: 6px;
}
</style>
