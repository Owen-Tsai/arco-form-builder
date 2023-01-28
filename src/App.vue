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
import { Schema, formDataCtxKey } from '@/types/builder'
import { useWidgetActions } from '@/hooks/use-widgets'
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

provide(formDataCtxKey, schema.value.formConfig)

useWidgetActions(schema.value)
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
  padding: 32px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));

  .canvas {
    background-color: #fff;
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
