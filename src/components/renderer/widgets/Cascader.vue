<template>
  <a-cascader
    :key="config.defaultValue"
    v-model="modelValue"
    :default-value="config.defaultValue"
    :placeholder="config.placeholder"
    :disabled="config.disabled"
    :allow-search="config.allowSearch"
    :allow-clear="config.allowClear"
    :multiple="!!config.limit && config.limit > 0"
    :check-strictly="config.strict"
    :options="value"
    @change="handler('onChange')"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptCascader } from '@/types/widget'
import { useDataSource } from '@/hooks/use-data-source'
import { useModelValue } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptCascader>,
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

const { value } = useDataSource(props.config.dataSourceType, props.config.data)

const { handler } = useEvents(props.uid, props.config.actions)
</script>
