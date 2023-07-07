<h1 align="center">Arco Form Builder</h1>
<p align="center">Visualized form designer & runtime form renderer based on <a href="https://arco.design/vue/docs/start">@arco-design/web-vue</a></p>

## Install

`@arco-design/web-vue`, `axios` and `vue` must be installed as they are peer dependencies of the package.

```sh
npm install arco-form-builder
# or
yarn add arco-form-builder
```

## Usage

```ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'

import ArcoFormBuilder from 'arco-form-builder' // import ArcoFormBuilder
import 'arco-form-builder/dist/style.css'       // import stylesheet

const app = createApp(App)
app.use(ArcoVue)
app.use(ArcoIcon)
app.use(ArcoFormBuilder)  // use the package
app.mount('#app')
```

Then use `SFormBuilder` for designing the schema visually, and use `SFormViewer` for rendering the form at runtime.

Or import provided components into your component files:

```vue
<template>
  <FormBuilder :schema="schema" />
</template>

<script setup lang="ts">
import { FormBuilder } from 'arco-form-builder'
// ...
</script>
```
