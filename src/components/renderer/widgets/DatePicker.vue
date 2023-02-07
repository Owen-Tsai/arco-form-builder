<template>
  <a-date-picker
    v-if="config.mode === 'date'"
    v-bind="properties"
    :placeholder="config.placeholder"
    style="width: 100%"
  />
  <a-week-picker
    v-else-if="config.mode === 'week'"
    v-bind="properties"
    :placeholder="config.placeholder"
    style="width: 100%"
  />
  <a-quarter-picker
    v-else-if="config.mode === 'quarter'"
    v-bind="properties"
    :placeholder="config.placeholder"
    style="width: 100%"
  />
  <a-month-picker
    v-else-if="config.mode === 'month'"
    v-bind="properties"
    :placeholder="config.placeholder"
    style="width: 100%"
  />
  <a-year-picker
    v-else-if="config.mode === 'year'"
    v-bind="properties"
    :placeholder="config.placeholder"
    style="width: 100%"
  />
  <a-range-picker
    v-else
    v-bind="properties"
    :placeholder="(config.placeholder as string[])"
    style="width: 100%"
    :mode="(config.mode.replace('range', '') as ('date' | 'week' | 'month' | 'quarter' | 'year'))"
  />
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { OptDatePicker } from '@/types/widget'
import useForm from '@/hooks/use-form-injection'

const props = defineProps({
  config: {
    type: Object as PropType<OptDatePicker>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const { form } = useForm()

const properties = ref({
  allowClear: props.config.allowClear,
  format: props.config.format,
  readonly: props.config.readonly,
  disabled: props.config.disabled,
  modelValue: form[props.uid],
})
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
}
</style>
