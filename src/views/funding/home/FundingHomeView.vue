<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
// import { fetchFundingsOverview } from '../../api/client'

const loading = ref(false)
const overview = reactive({
  totalAssets: 0,
  assets: [],
  idleFunds: 0,
  interestIncome: 0,
})

/**
 * 取得read Error相關資料。
 * @param error - 錯誤物件。
 */

function readError(error: any) {
  return error?.response?.data?.message || error?.message || '請求失敗'
}

/**
 * 格式化format Amount內容供顯示或輸出。
 * @param value - 輸入值。
 */

function formatAmount(value: number) {
  return Number(value || 0).toLocaleString('zh-TW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  })
}

/**
 * 處理reload邏輯。
 */

async function reload() {
  // loading.value = true
  // try {
  //   const response = await fetchFundingsOverview()
  //   const data = response?.data || {}
  //   overview.totalAssets = Number(data.totalAssets || 0)
  //   overview.idleFunds = Number(data.idleFunds || 0)
  //   overview.interestIncome = Number(data.interestIncome || 0)
  //   overview.assets = Array.isArray(data.assets) ? data.assets : []
  //   ElNotification({
  //     title: '載入成功',
  //     message: '資金總覽已更新',
  //     type: 'success',
  //   })
  // } catch (error) {
  //   ElNotification({
  //     title: '載入失敗',
  //     message: readError(error),
  //     type: 'error',
  //   })
  // } finally {
  //   loading.value = false
  // }
}

onMounted(async () => {
  await reload()
})
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <h2>資金總覽</h2>
      <el-button type="primary" :loading="loading" @click="reload">重新整理</el-button>
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
