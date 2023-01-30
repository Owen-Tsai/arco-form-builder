<template>
  <div class="canvas">
    <CanvasLayout :schema="schema" />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, toRefs, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { FormData, formDataCtxKey, Schema } from '@/types/builder'
import { Widget, FormWidget } from '@/types/widget'
import CanvasLayout from '../builder/CanvasLayout.vue'

defineProps({
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.canvas {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 16px 24px;
}
</style>
