<template>
  <Draggable
    :list="list"
    v-bind="{
      group: 'widgets',
      ghostClass: 'dragging-ghost',
      animation: 200,
    }"
    :swap-threshold="0.05"
    item-key="uid"
  >
    <template #item="{ element }: { element: Widget, index: number }">
      <div>
        <LayoutRenderer
          v-if="element.type === 'grid' || element.type === 'tab'"
          :widget="element"
        />
        <FormItemRenderer v-else :widget="element" />
      </div>
    </template>
  </Draggable>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import Draggable from 'vuedraggable'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Widget } from '@/types/widget'
import FormItemRenderer from '../renderer/FormItemRenderer.vue'
import LayoutRenderer from '../renderer/LayoutRenderer.vue'

defineProps({
  list: {
    type: Array as PropType<Widget[]>,
    required: true,
  },
})
</script>
