import './assets/main.css'
import 'vue3-openlayers/styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import OpenLayersMap from 'vue3-openlayers'
import App from './App.vue'
import { createAppRouter } from './router'

const app = createApp(App)
const router = createAppRouter()

app.use(OpenLayersMap /* options */)
app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
