<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.fieldName" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.label" allow-clear />
  </a-form-item>
  <a-form-item label="默认值">
    <a-input v-model="form[props.config.uid]" allow-clear />
  </a-form-item>
  <a-form-item label="宽度">
    <a-input
      v-model="widget.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="提示文字">
    <a-input v-model="widget.placeholder" />
  </a-form-item>
  <a-form-item label="最小值">
    <a-input-number v-model="widget.min" :min="0" />
  </a-form-item>
  <a-form-item label="最大值">
    <a-input-number v-model="widget.max" />
  </a-form-item>
  <a-form-item label="精度">
    <a-input-number v-model="widget.precision" :min="0" />
  </a-form-item>
  <a-form-item label="步长">
    <a-input-number v-model="widget.step" />
  </a-form-item>
  <a-form-item label="前缀">
    <a-input v-model="widget.prefix" allow-clear />
  </a-form-item>
  <a-form-item label="后缀">
    <a-input v-model="widget.suffix" allow-clear />
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否必填</span>
    <a-switch v-model="widget.required" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否只读</span>
    <a-switch v-model="widget.readonly" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">允许清除</span>
    <a-switch v-model="widget.allowClear" />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { ConfigInputNumber } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'

const emit = defineEmits(['update:config'])
const props = defineProps({
  config: {
    type: Object as PropType<ConfigInputNumber>,
    required: true,
  },
})
const widget = computed({
  get: () => props.config.config,
  set: (val) => {
    emit('update:config', val)
  },
})

const { form } = useFormData()
</script>
