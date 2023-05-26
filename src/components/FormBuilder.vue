<template>
  <div class="page">
    <aside class="left">
      <Stencil />
    </aside>
    <main>
      <div class="canvas-wrapper">
        <Canvas class="canvas" :schema="schema" />
      </div>
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
import Stencil from '@/components/stencil/Stencil.vue'
import Canvas from '@/components/canvas/CanvasLayout.vue'
import ConfigPanel from '@/components/config-panel/ConfigPanel.vue'

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

const savedSchema = localStorage.getItem('schema')

if (savedSchema) {
  schema.value = JSON.parse(savedSchema)
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

  .canvas-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: 16px 24px;
    background-color: #fff;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
}
</style>
