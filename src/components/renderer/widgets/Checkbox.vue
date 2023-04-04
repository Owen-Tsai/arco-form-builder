<template>
  <a-checkbox-group
    v-model="form[uid]"
    :default-value="config.defaultValue"
    :direction="config.direction"
    :disabled="config.disabled"
    :style="{ width: config.width }"
    @change="handler('onChange')"
  >
    <a-checkbox v-for="(opt, i) in options" :key="i" :value="opt.value">
      {{ opt.label }}
    </a-checkbox>
  </a-checkbox-group>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptCheckbox } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'
import { useDataSource } from '@/hooks/use-data-source'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptCheckbox>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const options = useDataSource(props.config.dataSourceType, props.config.data)

const { form } = useFormData()

const { handler } = useEvents(props.uid, props.config.actions)
</script>
