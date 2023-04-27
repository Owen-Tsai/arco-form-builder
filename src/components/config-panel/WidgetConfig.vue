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
    <Cascader v-if="config.type === 'cascader'" :config="config" />
    <DatePicker v-if="config.type === 'datePicker'" :config="config" />
    <Upload v-if="config.type === 'upload'" :config="config" />

    <Grid v-if="config.type === 'grid'" :widget="config" />
    <Tab v-if="config.type === 'tab'" :widget="config" />

    <template
      v-if="
        config.type !== 'grid' &&
        config.type !== 'tab' &&
        config.type !== 'upload'
      "
    >
      <!-- validation config -->
      <div>
        <span class="label">自定义校验规则</span>
        <Codemirror
          v-model="config.config.rules"
          :tab-size="2"
          :extensions="[javascript()]"
          class="codemirror-editor"
          style="height: 180px"
        />
      </div>
      <a-form-item label="校验触发时机">
        <a-select
          v-model="config.config.trigger"
          multiple
          :allow-search="false"
        >
          <a-option
            v-for="opt in inputEvtNames"
            :key="opt"
            :value="opt"
            :label="opt"
          />
        </a-select>
      </a-form-item>
      <ActionConfig :widget="(widget as NormalFormWidget)" />
    </template>
  </a-form>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { NormalFormWidget, Widget } from '@/types/widget'
import { inputEvtNames } from '@/utils'
import Grid from './widgets/Grid.vue'
import Tab from './widgets/Tab.vue'
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
import Cascader from './widgets/Cascader.vue'
import Upload from './widgets/Upload.vue'
import ActionConfig from './widgets/ActionConfig.vue'

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
  padding-bottom: 48px;
}

.codemirror-editor {
  margin-bottom: 16px;
  margin-top: 8px;
  border: 1px solid var(--color-border-2);
}
</style>
