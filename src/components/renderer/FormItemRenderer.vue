<template>
  <a-form-item
    :label="widget.config.label || widget.name"
    :required="widget.config.required"
    :field="widget.uid"
    :rules="computedRules(widget.config.rules)"
    :validate-trigger="widget.config.trigger"
    class="form-item"
    :class="{ 'widget-wrapper': !production }"
    @click="onFormItemClick"
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
    <!-- insert dedicated renderer -->
    <template v-if="!production">
      <IconAction class="button-tl" :icon="DragMove" />
      <IconAction class="button-br" :icon="DeleteBinFill" />
    </template>
  </a-form-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { DeleteBinFill, DragMove } from '@salmon-ui/icons'
import type { FormWidget } from '@/types/widget'
import IconAction from '../private/IconAction.vue'
import Input from './widgets/Input.vue'
import InputNumber from './widgets/InputNumber.vue'
import InputTag from './widgets/InputTag.vue'
import Textarea from './widgets/Textarea.vue'
import Select from './widgets/Select.vue'

const props = defineProps({
  widget: {
    type: Object as PropType<FormWidget>,
    required: true,
  },
  production: Boolean,
})

const computedRules = (rules?: string) => {
  if (props.production) return undefined
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

const onFormItemClick = () => {
  // if (!props.production) return
  // TODO: set selectedWidget
}
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;

.form-item {
  position: relative;

  .icon-action {
    position: absolute;
  }
  .button-tl {
    top: 0;
    left: 0;
  }
  .button-br {
    bottom: 0;
    right: 0;
  }
}
</style>
