<template>
  <a-form-item
    :label="widget.config.label || widget.name"
    :required="widget.config.required"
    :field="widget.uid"
    :validate-trigger="widget.config.trigger"
    :rules="computedRules"
  >
    <Input
      v-if="widget.type === 'input'"
      :config="widget.config"
      :uid="widget.uid"
      mode="prod"
    />
    <InputNumber
      v-if="widget.type === 'inputNumber'"
      :config="widget.config"
      :uid="widget.uid"
      mode="prod"
    />
    <InputTag
      v-if="widget.type === 'inputTag'"
      :config="widget.config"
      :uid="widget.uid"
    />
    <Textarea
      v-if="widget.type === 'textarea'"
      :config="widget.config"
      :uid="widget.uid"
    />
    <Select
      v-if="widget.type === 'select'"
      :config="widget.config"
      :uid="widget.uid"
    />
    <Radio
      v-if="widget.type === 'radio'"
      :config="widget.config"
      :uid="widget.uid"
    />
    <Checkbox
      v-if="widget.type === 'checkbox'"
      :config="widget.config"
      :uid="widget.uid"
    />
    <Slider
      v-if="widget.type === 'slider'"
      :config="widget.config"
      :uid="widget.uid"
    />
    <Rate
      v-if="widget.type === 'rate'"
      :config="widget.config"
      :uid="widget.uid"
    />
    <Switch
      v-if="widget.type === 'switch'"
      :config="widget.config"
      :uid="widget.uid"
    />
    <Cascader
      v-if="widget.type === 'cascader'"
      :config="widget.config"
      :uid="widget.uid"
    />
    <DatePicker
      v-if="widget.type === 'datePicker'"
      :uid="widget.uid"
      :config="widget.config"
    />
  </a-form-item>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { FieldRule } from '@arco-design/web-vue'
import { safeEval } from '@/utils'
import { FormWidget } from '@/types/widget'
import Input from './Input.vue'
import InputNumber from './InputNumber.vue'
import InputTag from './InputTag.vue'
import Textarea from './Textarea.vue'
import Select from './Select.vue'
import Radio from './Radio.vue'
import Checkbox from './Checkbox.vue'
import Slider from './Slider.vue'
import Rate from './Rate.vue'
import Switch from './Switch.vue'
import Cascader from './Cascader.vue'
import DatePicker from './DatePicker.vue'

const props = defineProps({
  widget: {
    type: Object as PropType<FormWidget>,
    required: true,
  },
})

const computedRules = computed(() => {
  const { rules } = props.widget.config
  let result: FieldRule<any> | FieldRule<any>[] | undefined
  try {
    if (rules && rules.trim() !== '') {
      // disable no-eval temporarily
      // eslint-disable-next-line no-eval
      result = safeEval(rules)
    }
  } catch (e) {
    // do nothing
  }
  return result
})
</script>
