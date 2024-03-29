import { createApp } from 'vue'
import Arco from '@arco-design/web-vue'
import ArcoIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'

import '@/styles/index.scss'

const app = createApp(App)

app.use(Arco)
app.use(ArcoIcon)

app.mount('#app')
