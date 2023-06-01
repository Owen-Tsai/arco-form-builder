<template>
  <div class="page">
    <aside class="left">
      <Stencil />
    </aside>
    <main>
      <div class="canvas-wrapper">
        <Canvas class="canvas" :schema="computedSchema" />
      </div>
    </main>
    <aside class="right">
      <ConfigPanel :schema="computedSchema" :selected-widget="selectedWidget" />
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, provide, PropType } from 'vue'
import {
  Schema,
  FormBuilderContext,
  FormDataContext,
  FormData,
  formBuilderCtxKey,
  formDataCtxKey,
} from '@/types/builder'
import { Widget } from '@/types/widget'
import Stencil from '@/components/stencil/Stencil.vue'
import Canvas from '@/components/canvas/CanvasLayout.vue'
import ConfigPanel from '@/components/config-panel/ConfigPanel.vue'

const props = defineProps({
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
})

const emit = defineEmits(['update:schema'])

const computedSchema = computed({
  get: () => props.schema,
  set: (val) => {
    emit('update:schema', val)
  },
})

const selectedWidget = ref<Widget>()
const form = ref<FormData>({})

const setSelectedWidget = (widget: Widget) => {
  selectedWidget.value = widget
}

// inject builderContext
provide<FormBuilderContext>(formBuilderCtxKey, {
  schema: computedSchema.value,
  selectedWidget,
  setSelectedWidget,
})
const resetForm = () => {
  form.value = {}
}
provide<FormDataContext>(formDataCtxKey, {
  resetForm,
  form,
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
