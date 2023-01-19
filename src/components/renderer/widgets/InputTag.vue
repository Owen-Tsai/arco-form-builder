<template>
  <a-input-tag
    v-model="form[uid]"
    :allow-clear="config.allowClear"
    :disabled="config.disabled"
    :readonly="config.readonly"
    :max-tag-count="config.limit"
    :placeholder="config.placeholder"
  >
    <template v-if="config.prefix" #prepend>{{ config.prefix }}</template>
    <template v-if="config.affix" #append>{{ config.affix }}</template>
  </a-input-tag>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptInputTag } from '@/types/widget'
import useForm from '@/hooks/use-form-injection'

defineProps({
  config: {
    type: Object as PropType<OptInputTag>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const { form } = useForm()
</script>
