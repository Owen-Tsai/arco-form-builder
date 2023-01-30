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
import { ref, computed, PropType } from 'vue'
import { DeleteBinFill, DragMove } from '@salmon-ui/icons'
import { FormWidget, Widget } from '@/types/widget'
import { useBuilderInjection } from '@/hooks/use-widgets'
import IconAction from '../private/IconAction.vue'
import Input from './widgets/Input.vue'

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
