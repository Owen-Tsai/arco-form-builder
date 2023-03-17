<template>
  <div class="widget-renderer">
    <a-form-item
      :label="widget.config.label || widget.name"
      :required="widget.config.required"
      :field="widget.uid"
      class="widget-wrapper"
      :class="{ 'is-selected': isWidgetSelected(widget.uid) }"
      @click="onWidgetSelect(index)"
    >
      <Input
        v-if="widget.type === 'input'"
        :config="widget.config"
        :uid="widget.uid"
      />
      <InputNumber
        v-if="widget.type === 'inputNumber'"
        :config="widget.config"
        :uid="widget.uid"
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

    <IconAction
      v-show="isWidgetSelected(widget.uid)"
      class="button-tl drag-handler"
      :icon="IconDragArrow"
    />
    <IconAction
      v-show="isWidgetSelected(widget.uid)"
      class="button-br"
      :icon="IconDelete"
      @click="onWidgetDelete(index)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { IconDragArrow, IconDelete } from '@arco-design/web-vue/es/icon'
import { FormWidget, Widget } from '@/types/widget'
import { useBuilderInjection } from '@/hooks/use-widgets'
import Input from '../renderer/widgets/Input.vue'
import InputNumber from '../renderer/widgets/InputNumber.vue'
import InputTag from '../renderer/widgets/InputTag.vue'
import Textarea from '../renderer/widgets/Textarea.vue'
import Select from '../renderer/widgets/Select.vue'
import Radio from '../renderer/widgets/Radio.vue'
import Checkbox from '../renderer/widgets/Checkbox.vue'
import Slider from '../renderer/widgets/Slider.vue'
import Rate from '../renderer/widgets/Rate.vue'
import Switch from '../renderer/widgets/Switch.vue'
import Cascader from '../renderer/widgets/Cascader.vue'
import DatePicker from '../renderer/widgets/DatePicker.vue'
import IconAction from '../private/IconAction.vue'

const props = defineProps({
  widget: {
    type: Object as PropType<FormWidget>,
    required: true,
  },
  parentWidgetList: {
    type: Object as PropType<Widget[]>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

const parentWidgets = ref(props.parentWidgetList)

const { isWidgetSelected, onWidgetDelete, onWidgetSelect } =
  useBuilderInjection(parentWidgets)
</script>

<style lang="scss" scoped>
.widget-renderer {
  position: relative;
}
</style>
