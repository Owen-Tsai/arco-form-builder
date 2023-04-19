<template>
  <a-date-picker
    v-if="config.mode === 'date'"
    :key="`date-${config.defaultValue}`"
    v-model="modelValue"
    :default-value="(props.config.defaultValue as string)"
    :allow-clear="props.config.allowClear"
    :format="props.config.format"
    :readonly="props.config.readonly"
    :disabled="props.config.disabled"
    :placeholder="config.placeholder"
    class="date-picker-sub-item"
    :style="{ width: config.width }"
  />
  <a-week-picker
    v-else-if="config.mode === 'week'"
    :key="`week-${config.defaultValue}`"
    v-model="modelValue"
    :default-value="(props.config.defaultValue as string)"
    :allow-clear="props.config.allowClear"
    :format="props.config.format"
    :readonly="props.config.readonly"
    :disabled="props.config.disabled"
    :placeholder="config.placeholder"
    class="date-picker-sub-item"
    :style="{ width: config.width }"
  />
  <a-quarter-picker
    v-else-if="config.mode === 'quarter'"
    :key="`quarter-${config.defaultValue}`"
    v-model="modelValue"
    :default-value="(props.config.defaultValue as string)"
    :allow-clear="props.config.allowClear"
    :format="props.config.format"
    :readonly="props.config.readonly"
    :disabled="props.config.disabled"
    :placeholder="config.placeholder"
    :style="{ width: config.width }"
    class="date-picker-sub-item"
  />
  <a-month-picker
    v-else-if="config.mode === 'month'"
    :key="`month-${config.defaultValue}`"
    v-model="modelValue"
    :default-value="(props.config.defaultValue as string)"
    :allow-clear="props.config.allowClear"
    :format="props.config.format"
    :readonly="props.config.readonly"
    :disabled="props.config.disabled"
    :placeholder="config.placeholder"
    :style="{ width: config.width }"
    class="date-picker-sub-item"
  />
  <a-year-picker
    v-else-if="config.mode === 'year'"
    :key="`year-${config.defaultValue}`"
    v-model="modelValue"
    :default-value="(props.config.defaultValue as string)"
    :allow-clear="props.config.allowClear"
    :format="props.config.format"
    :readonly="props.config.readonly"
    :disabled="props.config.disabled"
    :placeholder="config.placeholder"
    :style="{ width: config.width }"
    class="date-picker-sub-item"
  />
  <a-range-picker
    v-else
    :key="`range-${config.defaultValue?.toString()}`"
    v-model="modelValue"
    :default-value="(props.config.defaultValue as string[])"
    :allow-clear="props.config.allowClear"
    :format="props.config.format"
    :readonly="props.config.readonly"
    :disabled="props.config.disabled"
    :placeholder="(config.placeholder as string[])"
    :style="{ width: config.width }"
    class="date-picker-sub-item"
    :mode="(config.mode.replace('range', '') as ('date' | 'week' | 'month' | 'quarter' | 'year'))"
  />
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { OptDatePicker } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'

const props = defineProps({
  config: {
    type: Object as PropType<OptDatePicker>,
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
