<template>
  <a-rate
    v-model="form[uid]"
    :count="config.count"
    :allow-half="config.allowHalf"
    :grading="config.grading"
    :readonly="config.readonly"
    :disabled="config.disabled"
    :color="config.color"
    @change="handler('onChange')"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptRate } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptRate>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const { form } = useFormData()

const { handler } = useEvents(props.uid, props.config.actions)
</script>
