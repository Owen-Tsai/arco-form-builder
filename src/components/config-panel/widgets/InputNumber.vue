<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.uid" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.config.label" allow-clear />
  </a-form-item>
  <a-form-item label="默认值">
    <a-input-number v-model="widget.config.defaultValue" allow-clear />
  </a-form-item>
  <a-form-item label="宽度">
    <a-input
      v-model="widget.config.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="提示文字">
    <a-input v-model="widget.config.placeholder" />
  </a-form-item>
  <a-form-item label="最小值">
    <a-input-number v-model="widget.config.min" :min="0" />
  </a-form-item>
  <a-form-item label="最大值">
    <a-input-number v-model="widget.config.max" />
  </a-form-item>
  <a-form-item label="精度">
    <a-input-number v-model="widget.config.precision" :min="0" />
  </a-form-item>
  <a-form-item label="步长">
    <a-input-number v-model="widget.config.step" />
  </a-form-item>
  <a-form-item label="前缀">
    <a-input v-model="widget.config.prefix" allow-clear />
  </a-form-item>
  <a-form-item label="后缀">
    <a-input v-model="widget.config.suffix" allow-clear />
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.config.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否必填</span>
    <a-switch v-model="widget.config.required" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否只读</span>
    <a-switch v-model="widget.config.readonly" />
  </div>
  <div class="boolean-config-field">
    <span class="label">允许清除</span>
    <a-switch v-model="widget.config.allowClear" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">默认隐藏</span>
    <a-switch v-model="widget.config.hideByDefault" />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { ConfigInputNumber } from '@/types/widget'

const emit = defineEmits(['update:config'])
const props = defineProps({
  config: {
    type: Object as PropType<ConfigInputNumber>,
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
