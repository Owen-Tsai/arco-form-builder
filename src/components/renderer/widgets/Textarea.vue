<template>
  <a-textarea
    :key="key"
    v-model="form[uid]"
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
import { useFormData } from '@/hooks/use-context'
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
})

const { form } = useFormData()
const { handler } = useEvents(props.uid, props.config.actions)

watch(
  () => [props.config.minRows, props.config.maxRows],
  () => {
    key.value++
  }
)
</script>
