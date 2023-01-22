<template>
  <button class="icon-action">
    <Icon :name="icon" />
  </button>
</template>

<script lang="ts" setup>
import { PropType, type Component } from 'vue'
import Icon from './Icon.vue'

defineProps({
  icon: {
    type: Object as PropType<Component>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
@use '@/styles/mixins.scss' as *;

.icon-action {
  outline: none;
  border: 0;
  background-color: $blue-6;
  color: #fff;
  @include flex-center;
  padding: 4px;
  font-size: $text-md;
  cursor: pointer;
}
</style>
