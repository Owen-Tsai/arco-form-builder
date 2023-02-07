<template>
  <a-form-item
    :label="widget.config.label || widget.name"
    :required="widget.config.required"
    :field="widget.uid"
    :rules="computedRules(widget.config.rules)"
    :validate-trigger="widget.config.trigger"
    class="form-item"
  >
    <Input
      v-if="widget.type === 'input'"
      :uid="widget.uid"
      :config="widget.config"
    />
    <InputNumber
      v-if="widget.type === 'inputNumber'"
      :uid="widget.uid"
      :config="widget.config"
    />
    <InputTag
      v-if="widget.type === 'inputTag'"
      :uid="widget.uid"
      :config="widget.config"
    />
    <Textarea
      v-if="widget.type === 'textarea'"
      :uid="widget.uid"
      :config="widget.config"
    />
    <Select
      v-if="widget.type === 'select'"
      :uid="widget.uid"
      :config="widget.config"
    />
    <DatePicker
      v-if="widget.type === 'datePicker'"
      :uid="widget.uid"
      :config="widget.config"
    />
  </a-form-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { FormWidget } from '@/types/widget'
import Input from './widgets/Input.vue'
import InputNumber from './widgets/InputNumber.vue'
import InputTag from './widgets/InputTag.vue'
import Textarea from './widgets/Textarea.vue'
import Select from './widgets/Select.vue'
import DatePicker from './widgets/DatePicker.vue'

const props = defineProps({
  widget: {
    type: Object as PropType<FormWidget>,
    required: true,
  },
})

const computedRules = (rules?: string) => {
  let result
  try {
    if (rules && rules.trim() !== '') {
      // disable no-eval temporarily
      // eslint-disable-next-line no-eval
      result = eval(rules)
    }
  } catch (e) {
    // do nothing
  }
  return result
}
</script>
