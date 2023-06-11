<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.uid" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.config.label" allow-clear />
  </a-form-item>
  <a-form-item label="默认值">
    <a-textarea v-model="widget.config.defaultValue" />
  </a-form-item>
  <a-form-item label="宽度">
    <a-input
      v-model="widget.config.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="提示文字">
    <a-input v-model="widget.config.placeholder" allow-clear />
  </a-form-item>
  <a-form-item label="最大字数限制">
    <a-input-number v-model="widget.config.maxLength" allow-clear />
  </a-form-item>
  <a-form-item label="最小行数">
    <a-input-number v-model="widget.config.minRows" allow-clear />
  </a-form-item>
  <a-form-item label="最大行数">
    <a-input-number v-model="widget.config.maxRows" allow-clear />
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.config.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否显示输入计数</span>
    <a-switch v-model="widget.config.showWordLimit" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否必填</span>
    <a-switch v-model="widget.config.required" />
  </div>
  <div class="boolean-config-field">
    <span class="label">允许清除</span>
    <a-switch v-model="widget.config.allowClear" />
  </div>
  <div class="boolean-config-field">
    <span class="label">隐藏标签</span>
    <a-switch v-model="widget.config.hideLabel" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">默认隐藏</span>
    <a-switch v-model="widget.config.hideByDefault" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { ConfigTextarea } from '@/types/widget'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigTextarea>,
    required: true,
  },
})

const widget = computed({
  get: () => props.config,
  set: (val) => {
    emit('update:config', val)
  },
})
</script>
