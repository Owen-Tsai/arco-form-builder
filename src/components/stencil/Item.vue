<template>
  <div class="draggable-item">
    <span>{{ widget.name }}</span>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Widget } from '@/types/widget'

defineProps({
  widget: {
    type: Object as PropType<Widget>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;

.draggable-item {
  border: 1px solid $gray-3;
  border-radius: 4px;
  color: $gray-7;
  background-color: $gray-1;
  font-size: $text-sm;
  user-select: none;
  cursor: move;
  text-align: center;
  padding: 8px;

  &:hover {
    border: 1px dashed $blue-6;
    background-color: $blue-1;
    color: $blue-6;
  }
}
</style>
