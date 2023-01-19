<template>
  <button>{{ widget.type }}</button>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import type { Widget } from '@/types/widget'

defineProps({
  widget: {
    type: Object as PropType<Widget>,
    required: true,
  },
})
</script>
