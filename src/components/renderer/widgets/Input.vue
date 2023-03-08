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
    @change="(value) => handler(`'${value}'`, 'onChange')"
    @input="(value) => handler(`'${value}'`, 'onInput')"
    @focus="(value) => handler(`'${value}'`, 'onFocus')"
    @blur="(value) => handler(`'${value}'`, 'onBlur')"
  >
    <template v-if="config.prefix" #prepend>{{ config.prefix }}</template>
    <template v-if="config.suffix" #append>{{ config.suffix }}</template>
  </a-input>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptInput } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptInput>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const { form } = useFormData()

const { handler } = useEvents(props.config.actions)
</script>
