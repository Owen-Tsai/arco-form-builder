<template>
  <a-radio-group
    v-model="form[uid]"
    :direction="config.direction"
    :disabled="config.disabled"
  >
    <a-radio v-for="(opt, i) in options" :key="i" :value="opt.value">
      {{ opt.label }}
    </a-radio>
  </a-radio-group>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptRadio } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'
import { useDataSource } from '@/hooks/use-data-source'

const props = defineProps({
  config: {
    type: Object as PropType<OptRadio>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const options = useDataSource(
  props.config.dataSourceType,
  props.config.dataSource
)

const { form } = useFormData()
</script>
