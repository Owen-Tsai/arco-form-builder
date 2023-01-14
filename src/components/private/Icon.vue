<template>
  <span class="icon" :style="styles">
    <slot>
      <component :is="name" />
    </slot>
  </span>
</template>

<script lang="ts" setup>
import { computed, PropType, type Component, CSSProperties } from 'vue'

const props = defineProps({
  size: Number,
  color: String,
  name: Object as PropType<Component>,
})

const styles = computed<CSSProperties>(() => ({
  color: props.color,
  fontSize: props.size ? `${props.size}px` : undefined,
}))
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss';
.icon {
  vertical-align: middle;
  svg {
    height: 1em;
    width: 1em;
  }
}
</style>
