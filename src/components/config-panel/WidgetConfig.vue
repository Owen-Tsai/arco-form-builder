<template>
  <a-form :model="config" layout="vertical" class="form">
    <Input v-if="config.type === 'input'" :config="config" />
    <InputNumber v-if="config.type === 'inputNumber'" :config="config" />
    <InputTag v-if="config.type === 'inputTag'" :config="config" />
    <Textarea v-if="config.type === 'textarea'" :config="config" />
    <Select v-if="config.type === 'select'" :config="config" />
    <Radio v-if="config.type === 'radio'" :config="config" />
    <Checkbox v-if="config.type === 'checkbox'" :config="config" />
    <Switch v-if="config.type === 'switch'" :config="config" />
    <Slider v-if="config.type === 'slider'" :config="config" />
    <Rate v-if="config.type === 'rate'" :config="config" />
    <DatePicker v-if="config.type === 'datePicker'" :config="config" />
  </a-form>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { Widget } from '@/types/widget'
import Input from './widgets/Input.vue'
import InputNumber from './widgets/InputNumber.vue'
import InputTag from './widgets/InputTag.vue'
import Textarea from './widgets/Textarea.vue'
import Select from './widgets/Select.vue'
import Radio from './widgets/Radio.vue'
import Checkbox from './widgets/Checkbox.vue'
import Switch from './widgets/Switch.vue'
import Slider from './widgets/Slider.vue'
import Rate from './widgets/Rate.vue'
import DatePicker from './widgets/DatePicker.vue'

const props = defineProps({
  widget: {
    type: Object as PropType<Widget>,
    required: true,
  },
})

const emit = defineEmits(['update:widget'])

const config = computed({
  get: () => props.widget,
  set: (val) => {
    emit('update:widget', val)
  },
})
</script>

<style lang="scss" scoped>
.empty {
  padding: 32px;
  text-align: center;
  color: var(--color-text-3);
}
.form {
  padding: 16px;
}
</style>
