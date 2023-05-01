<template>
  <div class="stencil">
    <div class="group">
      <div class="group-content">
        <Draggable
          :list="widgetsList"
          :group="{ name: 'widgets', pull: 'clone', put: false }"
          item-key="type"
          :sort="false"
          :clone="cloneWidgetConfigFromRaw"
          class="draggable-items-container"
        >
          <template #item="{ element }: { element: Widget }">
            <component :is="itemSlot" :widget="element" />
          </template>
        </Draggable>
      </div>
    </div>

    <div class="group" style="margin-top: 24px">
      <a-space style="display: block" direction="vertical">
        <a-button long type="primary" @click="handleViewStart">
          测试用：预览表单
        </a-button>
        <a-button long @click="visible.schema = true">
          测试用：查看Schema
        </a-button>
        <a-button long @click="visible.formData = true">
          测试用：查看表单值
        </a-button>
        <a-button long @click="saveSchema">存储Schema</a-button>
      </a-space>
    </div>

    <a-modal :visible="visible.schema" hide-cancel @ok="visible.schema = false">
      <template #title>JSON Schema</template>
      <Codemirror
        v-model="computedSchema"
        :tab-size="2"
        :extensions="[javascript()]"
        class="codemirror-editor"
        style="height: 360px"
      />
    </a-modal>

    <a-modal
      :visible="visible.viewer"
      hide-cancel
      fullscreen
      unmount-on-close
      @ok="handleViewEnd"
      @close="handleViewEnd"
    >
      <template #title>表单预览</template>
      <Viewer :schema="schemaRef" />
    </a-modal>

    <a-modal
      :visible="visible.formData"
      hide-cancel
      @ok="visible.formData = false"
    >
      <template #title>表单值</template>
      <pre>{{ JSON.stringify(form, null, 2) }}</pre>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, PropType, type Component } from 'vue'
import Draggable from 'vuedraggable'
import { cloneDeep } from 'lodash'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { widgets } from '@/hooks/use-widgets'
import { useFormData, useBuilderContext } from '@/hooks/use-context'
import { generateUID } from '@/utils'
import type { Widget, WidgetName } from '@/types/widget'
import Viewer from '@/components/renderer/Viewer.vue'
import DraggableItem from './Item.vue'

const props = defineProps({
  components: {
    type: Array as PropType<WidgetName[]>,
    default: () => [
      'input',
      'inputNumber',
      'inputTag',
      'textarea',
      'select',
      'radio',
      'checkbox',
      'switch',
      'rate',
      'slider',
      'cascader',
      'datePicker',
      'upload',
      'grid',
      'tab',
    ],
  },
  itemSlot: {
    type: Object as PropType<Component>,
    default: DraggableItem,
  },
})

const visible = ref({
  schema: false,
  viewer: false,
  formData: false,
})

const { form, resetForm } = useFormData()
let { schema } = useBuilderContext()

const schemaRef = ref(schema)

const widgetsList = computed(() =>
  widgets.filter((w) => props.components.includes(w.type))
)

const computedSchema = computed({
  get: () => JSON.stringify(schema, null, 2),
  set: (val) => {
    schema = JSON.parse(val)
  },
})

const cloneWidgetConfigFromRaw = (widget: Widget) => {
  const uid = generateUID()
  widget.uid = uid
  return cloneDeep(widget)
}

const handleViewStart = () => {
  visible.value.viewer = true
}

const handleViewEnd = () => {
  resetForm()
  visible.value.viewer = false
}

const saveSchema = () => {
  localStorage.setItem('schema', computedSchema.value)
}
</script>

<style lang="scss" scoped>
.draggable-items-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
</style>
