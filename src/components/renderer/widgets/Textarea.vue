<template>
  <a-textarea
    :key="`${key}${config.defaultValue}`"
    v-model="modelValue"
    :default-value="config.defaultValue"
    :allow-clear="config.allowClear"
    :auto-size="{ minRows: config.minRows, maxRows: config.maxRows }"
    :disabled="config.disabled"
    :max-length="config.maxLength"
    :show-word-limit="config.showWordLimit"
    :placeholder="config.placeholder"
    :readonly="config.readonly"
    :style="{ width: config.width }"
    @change="handler('onChange')"
  />
</template>

<script lang="ts" setup>
import { watch, PropType, ref } from 'vue'
import { OptTextarea } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const key = ref(0)

const props = defineProps({
  config: {
    type: Object as PropType<OptTextarea>,
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

watch(
  () => [props.config.minRows, props.config.maxRows],
  () => {
    key.value++
  }
)
</script>
