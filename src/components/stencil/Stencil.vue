<template>
  <div class="stencil">
    <div class="group">
      <!-- <div class="group-title">组件</div> -->
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
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, type Component } from 'vue'
import Draggable from 'vuedraggable'
import { cloneDeep } from 'lodash'
import { widgets } from '@/hooks/use-widgets'
import { useFormData } from '@/hooks/use-context'
import { generateUID } from '@/utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Widget, WidgetName } from '@/types/widget'
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
      'grid',
      'tab',
    ],
  },
  itemSlot: {
    type: Object as PropType<Component>,
    default: DraggableItem,
  },
})

const { form } = useFormData()

const widgetsList = computed(() =>
  widgets.filter((w) => props.components.includes(w.type))
)

const cloneWidgetConfigFromRaw = (widget: Widget) => {
  const uid = generateUID()
  widget.uid = uid
  if (['inputTag'].includes(widget.type)) {
    form[uid] = []
  } else {
    form[uid] = undefined
  }
  return cloneDeep(widget)
}
</script>

<style lang="scss" scoped>
.draggable-items-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
</style>
