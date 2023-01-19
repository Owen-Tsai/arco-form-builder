<template>
  <a-input
    v-model="form[uid]"
    :allow-clear="config.allowClear"
    :disabled="config.disabled"
    :readonly="config.readonly"
    :max-length="config.maxLength"
    :placeholder="config.placeholder"
    :show-word-limit="config.showWordLimit"
  >
    <template v-if="config.prefix" #prepend>{{ config.prefix }}</template>
    <template v-if="config.affix" #append>{{ config.affix }}</template>
  </a-input>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptInput } from '@/types/widget'
import useForm from '@/hooks/use-form-injection'

defineProps({
  config: {
    type: Object as PropType<OptInput>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const { form } = useForm()
</script>
