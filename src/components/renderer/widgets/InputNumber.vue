<template>
  <a-input-number
    :key="config.defaultValue?.toString()"
    v-model="modelValue"
    :default-value="config.defaultValue"
    :allow-clear="config.allowClear"
    :disabled="config.disabled"
    :read-only="config.readonly"
    :min="config.min"
    :max="config.max"
    :placeholder="config.placeholder"
    :precision="config.precision"
    :step="config.step"
    :style="{ width: config.width }"
    :hide-button="!!config.suffix"
    @change="handler('onChange')"
    @input="handler('onInput')"
    @focus="handler('onFocus')"
    @blur="handler('onBlur')"
  >
    <template v-if="config.prefix" #prepend>{{ config.prefix }}</template>
    <template v-if="config.suffix" #append>{{ config.suffix }}</template>
  </a-input-number>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptInputNumber } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptInputNumber>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  mode: {
    type: String as PropType<'dev' | 'prod'>,
    default: 'dev',
  },
})

const { modelValue } = useModelValue(props.uid, props.mode)
const { handler } = useEvents(props.uid, props.config.actions)
</script>
