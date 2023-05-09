<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.fieldName" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.label" allow-clear />
  </a-form-item>
  <a-form-item label="默认值">
    <a-input-number v-model="widget.defaultValue" allow-clear />
  </a-form-item>
  <a-form-item label="分数上限">
    <a-input-number v-model="widget.count" :min="1" :step="1" :precision="0" />
    <template #extra>启用分级图标将致此项配置失效</template>
  </a-form-item>
  <a-form-item label="自定义颜色">
    <a-input v-model="widget.color" allow-clear />
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">允许半选</span>
    <a-switch v-model="widget.allowHalf" />
  </div>
  <div class="boolean-config-field">
    <span class="label">启用分级图标</span>
    <a-switch v-model="widget.grading" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否只读</span>
    <a-switch v-model="widget.readonly" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.disabled" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">默认隐藏</span>
    <a-switch v-model="widget.hideByDefault" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { ConfigRate } from '@/types/widget'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigRate>,
    required: true,
  },
})

const widget = computed({
  get: () => props.config.config,
  set: (val) => {
    emit('update:config', val)
  },
})
</script>
