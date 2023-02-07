<template>
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
    <DatePicker
      v-if="widget.type === 'datePicker'"
      :uid="widget.uid"
      :config="widget.config"
    />
    <IconAction
      v-show="isWidgetSelected(widget.uid)"
      class="button-tl drag-handler"
      :icon="DragMove"
    />
    <IconAction
      v-show="isWidgetSelected(widget.uid)"
      class="button-br"
      :icon="DeleteBinFill"
      @click="onWidgetDelete(index)"
    />
  </a-form-item>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { DeleteBinFill, DragMove } from '@salmon-ui/icons'
import { FormWidget, Widget } from '@/types/widget'
import { useBuilderInjection } from '@/hooks/use-widgets'
import Input from '../renderer/widgets/Input.vue'
import InputNumber from '../renderer/widgets/InputNumber.vue'
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
