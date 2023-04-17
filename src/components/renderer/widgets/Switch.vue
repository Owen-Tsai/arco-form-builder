<template>
  <a-switch
    v-model="modelValue"
    :default-checked="config.defaultValue"
    :disabled="config.disabled"
    :type="config.type"
    :direction="config.checkedValue"
    :checked-value="config.checkedValue"
    :unchecked-value="config.uncheckedValue"
    @change="handler('onChange')"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptSwitch } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptSwitch>,
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
</script>
