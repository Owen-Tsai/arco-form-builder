<template>
  <a-form-item
    :label="widget.config.label || widget.name"
    :required="widget.config.required"
    :field="widget.uid"
    :rules="computedRules(widget.config.rules)"
    :validate-trigger="widget.config.trigger"
  >
    <!-- insert dedicated renderer -->
  </a-form-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import type { FormWidget } from '@/types/widget'

const props = defineProps({
  widget: {
    type: Object as PropType<FormWidget>,
    required: true,
  },
})

const computedRules = (rules?: string) => {
  let result
  try {
    if (rules && rules.trim() !== '') {
      // disable no-eval temporarily
      // eslint-disable-next-line no-eval
      result = eval(rules)
    }
  } catch (e) {
    // do nothing
  }
  return result
}
</script>
