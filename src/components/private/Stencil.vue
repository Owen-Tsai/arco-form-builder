<template>
  <div class="stencil">
    <div class="group">
      <div class="group-title">组件</div>
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
            <slot name="item" :widget="element">
              <div class="draggable-item">{{ element.name }}</div>
            </slot>
          </template>
        </Draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { cloneDeep } from 'lodash'
import { widgets } from '@/hooks/use-widgets'
import { generateUID } from '@/utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Widget, WidgetName } from '@/types/widget'

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
      'grid',
      'tab',
    ],
  },
})

const widgetsList = computed(() =>
  widgets.filter((w) => props.components.includes(w.type))
)

const cloneWidgetConfigFromRaw = (widget: Widget) => {
  const uid = generateUID()
  widget.uid = uid
  return cloneDeep(widget)
}
</script>

<style lang="scss" scoped>
$item: '.draggable-item';

#{$item}s-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  #{$item} {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    color: #4b5563;
    padding: 8px 0;
    font-size: 14px;
    text-align: center;
    cursor: move;
    user-select: none;
  }
}
</style>
