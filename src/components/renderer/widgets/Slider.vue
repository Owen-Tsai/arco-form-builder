<template>
  <a-slider
    :key="config.defaultValue?.toString()"
    v-model="modelValue"
    :default-value="config.defaultValue"
    :step="config.step"
    :min="config.min"
    :marks="marks"
    :max="config.max"
    :disabled="config.disabled"
    :show-ticks="config.showTicks"
    :range="config.range"
    :style="{ width: config.width }"
    @change="handler('onChange')"
  />
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { OptSlider } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptSlider>,
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

const marks = computed(() => {
  const str = props.config.marks
  let result
  try {
    if (str && str.trim() !== '') {
      // eslint-disable-next-line no-eval
      result = eval(`_ = ${str}`)
    }
  } catch (e) {
    // nothing
  }

  return result
})

const { modelValue } = useModelValue(props.uid, props.mode)
const { handler } = useEvents(props.uid, props.config.actions)
</script>
