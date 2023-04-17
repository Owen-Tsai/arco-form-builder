<template>
  <a-rate
    v-model="modelValue"
    :default-value="config.defaultValue"
    :count="config.count"
    :allow-half="config.allowHalf"
    :grading="config.grading"
    :readonly="config.readonly"
    :disabled="config.disabled"
    :color="config.color"
    @change="handler('onChange')"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptRate } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptRate>,
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
