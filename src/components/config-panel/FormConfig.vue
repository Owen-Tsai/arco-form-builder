<template>
  <a-form :model="config" layout="vertical">
    <a-form-item label="表单尺寸">
      <a-select v-model="config.size">
        <a-option label="mini" />
        <a-option label="small" />
        <a-option label="medium" />
        <a-option label="large" />
      </a-select>
    </a-form-item>
    <a-form-item label="表单布局">
      <a-select v-model="config.layout">
        <a-option label="horizontal" />
        <a-option label="vertical" />
      </a-select>
    </a-form-item>
    <a-form-item
      v-show="config.layout === 'horizontal'"
      label="标签宽度占比/24"
    >
      <a-input-number v-model="config.labelSpan" />
    </a-form-item>
    <a-form-item
      v-show="config.layout === 'horizontal'"
      label="控件宽度占比/24"
    >
      <a-input-number v-model="config.wrapperSpan" />
    </a-form-item>
    <a-form-item label="标签对齐方式">
      <a-select v-model="config.labelAlign">
        <a-option label="left" />
        <a-option label="right" />
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { FormConfig } from '@/types/builder'

const props = defineProps({
  config: {
    type: Object as PropType<FormConfig>,
    required: true,
  },
})

const emit = defineEmits(['update:config'])

const config = computed({
  get: () => props.config,
  set: (val) => {
    emit('update:config', val)
  },
})
</script>
