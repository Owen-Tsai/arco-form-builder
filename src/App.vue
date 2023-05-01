<template>
  <div class="page">
    <aside class="left">
      <Stencil />
    </aside>
    <main>
      <Canvas class="canvas" :schema="schema" />
    </main>
    <aside class="right">
      <ConfigPanel :schema="schema" :selected-widget="selectedWidget" />
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import {
  Schema,
  formDataCtxKey,
  formBuilderCtxKey,
  FormBuilderContext,
  FormDataContext,
} from '@/types/builder'
import { Widget } from '@/types/widget'
import Stencil from './components/stencil/Stencil.vue'
import Canvas from './components/private/Canvas.vue'
import ConfigPanel from './components/config-panel/ConfigPanel.vue'

const schema = ref<Schema>({
  dataSourcesConfig: {
    remote: [],
    variable: {},
  },
  widgetActionConfig: [],
  formConfig: {
    labelAlign: 'left',
    layout: 'vertical',
    size: 'medium',
    labelSpan: 4,
    wrapperSpan: 20,
  },
  widgetsConfig: [],
})

if (localStorage.getItem('schema')) {
  schema.value = JSON.parse(localStorage.getItem('schema'))
}

const form = ref({})

const selectedWidget = ref<Widget>()

const setSelectedWidget = (widget: Widget) => {
  selectedWidget.value = widget
}

const resetForm = () => {
  form.value = {}
}

provide<FormBuilderContext>(formBuilderCtxKey, {
  schema: schema.value,
  selectedWidget,
  setSelectedWidget,
})

provide<FormDataContext>(formDataCtxKey, {
  form,
  resetForm,
})
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  position: relative;
  align-items: flex-start;
}
aside {
  width: 236px;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: #fff;

  &.left {
    left: 0;
    padding: 16px;
    border-right: 1px solid var(--color-border-2);
  }
  &.right {
    right: 0;
    border-left: 1px solid var(--color-border-2);
  }
}
main {
  flex-grow: 1;
  height: 100vh;
  padding: 32px;
  overflow: auto;

  .canvas {
    background-color: #fff;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
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
