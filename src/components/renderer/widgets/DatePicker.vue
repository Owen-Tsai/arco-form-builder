<template>
  <a-date-picker
    v-if="config.mode === 'date'"
    v-bind="properties"
    v-model="form[uid]"
    :placeholder="config.placeholder"
    class="date-picker-sub-item"
    :style="{ width: config.width }"
  />
  <a-week-picker
    v-else-if="config.mode === 'week'"
    v-bind="properties"
    v-model="form[uid]"
    :placeholder="config.placeholder"
    class="date-picker-sub-item"
    :style="{ width: config.width }"
  />
  <a-quarter-picker
    v-else-if="config.mode === 'quarter'"
    v-bind="properties"
    v-model="form[uid]"
    :placeholder="config.placeholder"
    :style="{ width: config.width }"
    class="date-picker-sub-item"
  />
  <a-month-picker
    v-else-if="config.mode === 'month'"
    v-bind="properties"
    v-model="form[uid]"
    :placeholder="config.placeholder"
    :style="{ width: config.width }"
    class="date-picker-sub-item"
  />
  <a-year-picker
    v-else-if="config.mode === 'year'"
    v-bind="properties"
    v-model="form[uid]"
    :placeholder="config.placeholder"
    :style="{ width: config.width }"
    class="date-picker-sub-item"
  />
  <a-range-picker
    v-else
    v-bind="properties"
    v-model="form[uid]"
    :placeholder="(config.placeholder as string[])"
    :style="{ width: config.width }"
    class="date-picker-sub-item"
    :mode="(config.mode.replace('range', '') as ('date' | 'week' | 'month' | 'quarter' | 'year'))"
  />
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { OptDatePicker } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'

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

const { form } = useFormData()

const properties = ref({
  defaultValue: props.config.defaultValue as any,
  allowClear: props.config.allowClear,
  format: props.config.format,
  readonly: props.config.readonly,
  disabled: props.config.disabled,
})
</script>

<style lang="scss">
.date-picker-sub-item {
  width: 100%;
}
</style>
