import './assets/main.css'
import './assets/input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@/lib/vue-query'
import { ElementPlus } from '@/lib/element-plus'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')
