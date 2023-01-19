<template>
  <a-textarea
    v-model="form[uid]"
    :allow-clear="config.allowClear"
    :auto-size="{ minRows: config.minRows, maxRows: config.maxRows }"
    :disabled="config.disabled"
    :max-length="config.maxLength"
    :show-word-limit="config.showWordLimit"
    :placeholder="config.placeholder"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptTextarea } from '@/types/widget'
import useForm from '@/hooks/use-form-injection'

defineProps({
  config: {
    type: Object as PropType<OptTextarea>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const { form } = useForm()
</script>
