<template>
  <a-input-number
    v-model="form[uid]"
    :allow-clear="config.allowClear"
    :disabled="config.disabled"
    :read-only="config.readonly"
    :min="config.min"
    :max="config.max"
    :placeholder="config.placeholder"
    :precision="config.precision"
    :step="config.step"
  >
    <template v-if="config.prefix" #prepend>{{ config.prefix }}</template>
    <template v-if="config.suffix" #append>{{ config.suffix }}</template>
  </a-input-number>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptInputNumber } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'

defineProps({
  config: {
    type: Object as PropType<OptInputNumber>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const { form } = useFormData()
</script>
