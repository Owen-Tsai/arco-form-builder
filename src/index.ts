import { FormBuilder, FormViewer } from '@/components'
import type { App } from 'vue'
import '@/styles/index.scss'

export default {
  install: (app: App) => {
    app.component('SFormBuilder', FormBuilder)
    app.component('SFormViewer', FormViewer)
  },
}

export { FormBuilder, FormViewer }
