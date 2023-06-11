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
  <a-form-item label="分数上限">
    <a-input-number
      v-model="widget.config.count"
      :min="1"
      :step="1"
      :precision="0"
    />
    <template #extra>启用分级图标将致此项配置失效</template>
  </a-form-item>
  <a-form-item label="自定义颜色">
    <a-input v-model="widget.config.color" allow-clear />
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">允许半选</span>
    <a-switch v-model="widget.config.allowHalf" />
  </div>
  <div class="boolean-config-field">
    <span class="label">启用分级图标</span>
    <a-switch v-model="widget.config.grading" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否只读</span>
    <a-switch v-model="widget.config.readonly" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.config.disabled" />
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
import { ConfigRate } from '@/types/widget'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigRate>,
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
