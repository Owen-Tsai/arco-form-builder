<template>
  <div class="page">
    <aside>
      <Stencil />
    </aside>
    <main>
      <Canvas class="canvas" :schema="schema" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import {
  Schema,
  formDataCtxKey,
  formBuilderCtxKey,
  FormBuilderContext,
} from '@/types/builder'
import { Widget } from '@/types/widget'
import Stencil from './components/stencil/Stencil.vue'
import Canvas from './components/private/Canvas.vue'

const schema = ref<Schema>({
  dataSourcesConfig: {
    remote: [],
    variable: {},
  },
  formConfig: {},
  formData: {},
  widgetsConfig: [],
})

const selectedWidget = ref<Widget>()

const setSelectedWidget = (widget: Widget) => {
  selectedWidget.value = widget
}

provide<FormBuilderContext>(formBuilderCtxKey, {
  schema: schema.value,
  selectedWidget,
  setSelectedWidget,
})

provide(formDataCtxKey, schema.value.formConfig)
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;

.page {
  display: flex;
  position: relative;
  align-items: flex-start;
}
aside {
  width: 236px;
  padding: 16px;
  flex-shrink: 0;
  border-right: 1px solid $gray-2;
  background-color: #fff;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
}
main {
  flex-grow: 1;
  height: 100vh;
  padding: 32px;

  .canvas {
    background-color: #fff;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
      drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  }
}
</style>

<style lang="scss">
// for demo page only!
#app {
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: #f8fafc;

  * {
    box-sizing: border-box;
  }
}
</style>
