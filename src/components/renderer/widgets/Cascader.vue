<template>
  <a-cascader
    v-model="form[uid]"
    :placeholder="config.placeholder"
    :disabled="config.disabled"
    :allow-search="config.allowSearch"
    :allow-clear="config.allowClear"
    :multiple="!!config.limit && config.limit > 0"
    :check-strictly="config.strict"
    :options="value"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptCascader } from '@/types/widget'
import { useDataSource } from '@/hooks/use-data-source'
import { useFormData } from '@/hooks/use-context'

const props = defineProps({
  config: {
    type: Object as PropType<OptCascader>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const { form } = useFormData()

const { value } = useDataSource(
  props.config.dataSourceType,
  props.config.dataSource
)
</script>
