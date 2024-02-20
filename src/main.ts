import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { createAppRouter } from './router'

const app = createApp(App)
const router = createAppRouter()

app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
