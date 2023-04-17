<template>
  <a-radio-group
    :key="config.defaultValue"
    v-model="modelValue"
    :default-value="config.defaultValue"
    :direction="config.direction"
    :disabled="config.disabled"
    :type="config.type"
    :style="{ width: config.width }"
    @change="handler('onChange')"
  >
    <a-radio v-for="(opt, i) in options" :key="i" :value="opt.value">
      {{ opt.label }}
    </a-radio>
  </a-radio-group>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptRadio } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'
import { useDataSource } from '@/hooks/use-data-source'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptRadio>,
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

const options = useDataSource(props.config.dataSourceType, props.config.data)

const { modelValue } = useModelValue(props.uid, props.mode)

const { handler } = useEvents(props.uid, props.config.actions)
</script>
