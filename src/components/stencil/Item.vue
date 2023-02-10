<template>
  <div class="draggable-item" :data-type="widget.type">
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
.draggable-item {
  border: 1px solid var(--color-border-3);
  border-radius: 4px;
  color: var(--color-text-2);
  background-color: var(--color-fill-1);
  font-size: 14px;
  user-select: none;
  cursor: move;
  text-align: center;
  padding: 8px;

  &:hover {
    border: 1px dashed rgb(var(--primary-6));
    background-color: rgb(var(--primary-1));
    color: rgb(var(--primary-6));
  }
}
</style>
