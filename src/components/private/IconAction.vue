<template>
  <button class="icon-action">
    <slot>
      <component :is="icon" />
    </slot>
  </button>
</template>

<script lang="ts" setup>
import { PropType, type Component } from 'vue'

defineProps({
  icon: {
    type: Object as PropType<Component>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;

.icon-action {
  outline: none;
  border: 0;
  background-color: rgb(var(--primary-6));
  color: #fff;
  @include flex-center;
  padding: 4px;
  font-size: 16px;
  cursor: pointer;

  svg {
    height: 1em;
    width: 1em;
  }
}
</style>
