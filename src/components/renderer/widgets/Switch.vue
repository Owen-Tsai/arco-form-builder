<template>
  <a-switch
    v-model="form[uid]"
    :disabled="config.disabled"
    :type="config.type"
    :direction="config.checkedValue"
    :checked-value="config.checkedValue"
    :unchecked-value="config.uncheckedValue"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { OptSwitch } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'

defineProps({
  config: {
    type: Object as PropType<OptSwitch>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

const { form } = useFormData()
</script>
