<template>
  <a-input-tag
    :key="config.defaultValue.toString()"
    v-model="modelValue"
    :default-value="config.defaultValue"
    :allow-clear="config.allowClear"
    :disabled="config.disabled"
    :readonly="config.readonly"
    :max-tag-count="config.limit"
    :placeholder="config.placeholder"
    :style="{ width: config.width }"
    @change="handler('onChange')"
    @input-value-change="handler('onInput')"
    @focus="handler('onFocus')"
    @blur="handler('onBlur')"
  >
    <template v-if="config.prefix" #prepend>{{ config.prefix }}</template>
    <template v-if="config.suffix" #append>{{ config.suffix }}</template>
  </a-input-tag>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptInputTag } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptInputTag>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  mode: {
    type: String as PropType<'prod' | 'dev'>,
    default: 'dev',
  },
})

const { modelValue } = useModelValue(props.uid, props.mode)
const { handler } = useEvents(props.uid, props.config.actions)
</script>
