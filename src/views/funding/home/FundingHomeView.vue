<script setup lang="ts">
import { computed } from 'vue'
import { useFetch } from '@/hooks'
import { formatAmount } from '@/utils'
import { getFundingsOverviewUsecase } from '@/domain/usecase'

const {
  data: overviewData,
  refetch: refetchOverviewData,
  isLoading: isLoadingOverviewData,
  isFetching: isFetchingOverviewData,
} = useFetch(getFundingsOverviewUsecase, undefined)

const handleReload = async () => {
  await refetchOverviewData()
}

const isLoading = computed(() => isLoadingOverviewData.value || isFetchingOverviewData.value)
</script>

<template>
  <div class="page">
    <div class="ml-auto">
      更新時間: {{ new Date(overviewData?.updatedAt || '').toLocaleString() }}
    </div>
    <div class="toolbar">
      <h2>資金總覽</h2>
      <el-button type="primary" :loading="isLoading" @click="handleReload">重新整理</el-button>
    </div>

    <el-row :gutter="16" v-loading="isLoading">
      <el-col :xs="24" :md="8">
        <el-card shadow="hover">
          <template #header>總資產</template>
          <div class="value">{{ formatAmount(overviewData?.totalAssets || 0) }}</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card shadow="hover">
          <template #header>閒置資金</template>
          <div class="value">{{ formatAmount(overviewData?.idleFunds || 0) }}</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card shadow="hover">
          <template #header>利息收入</template>
          <div class="value">{{ formatAmount(overviewData?.interestIncome || 0) }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-card shadow="never" class="table-card">
      <template #header>幣種資產明細</template>
      <el-table :data="overviewData?.assets || []" stripe v-loading="isLoading">
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
