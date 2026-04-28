<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const route = useRoute()
const router = useRouter()

/**
 * 處理logout邏輯。
 */

function logout() {
  ElNotification({
    title: '登出成功',
    message: '已登出使用者管理頁',
    type: 'success',
  })
  router.push('/funding-overview')
}
</script>

<template>
  <el-container class="fundings-shell">
    <el-aside width="220px" class="fundings-aside">
      <div class="brand">Fundings Console</div>
      <el-menu :default-active="route.path" router>
        <el-menu-item index="/funding/home">我的總覽</el-menu-item>
        <el-menu-item index="/funding/bot-settings">機器人設定</el-menu-item>
        <el-menu-item index="/funding/market">市場行情</el-menu-item>
        <el-menu-item index="/funding/loans">放款總覽</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="fundings-header">
        <div class="title">放貸機器人使用者管理</div>
        <el-button type="danger" plain @click="logout">登出</el-button>
      </el-header>
      <el-main class="fundings-main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.fundings-shell {
  min-height: 100vh;
}

.fundings-aside {
  border-right: 1px solid var(--el-border-color);
  background: #fff;
}

.brand {
  padding: 20px 14px 10px;
  font-size: 18px;
  font-weight: 700;
}

.fundings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
  background: #fff;
}

.title {
  font-size: 18px;
  font-weight: 700;
}

.fundings-main {
  background: #f5f7fb;
}
</style>
