<template>
  <a-input
    v-model="form[uid]"
    :allow-clear="config.allowClear"
    :disabled="config.disabled"
    :readonly="config.readonly"
    :max-length="config.maxLength"
    :placeholder="config.placeholder"
    :show-word-limit="config.showWordLimit"
    :style="{ width: config.width }"
    @change="(value) => onChange(value)"
  >
    <template v-if="config.prefix" #prepend>{{ config.prefix }}</template>
    <template v-if="config.suffix" #append>{{ config.suffix }}</template>
  </a-input>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptInput } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'
import { safeEval } from '@/utils'

const props = defineProps({
  config: {
    type: Object as PropType<OptInput>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  mode: {
    type: String as PropType<'dev' | 'prod'>,
    default: 'dev',
  },
})

const { form } = useFormData()

const onChange = (val: string) => {
  if (props.mode === 'dev') return
  try {
    safeEval(`const val = ${val}; ${props.config.onChange}`)
  } catch (e) {
    // nothing
  }
}
</script>
