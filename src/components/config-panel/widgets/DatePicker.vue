<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.fieldName" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.label" allow-clear />
  </a-form-item>
  <a-form-item label="模式">
    <a-select v-model="widget.mode" default-value="date">
      <a-option value="date">日期选择</a-option>
      <a-option value="week">周选择</a-option>
      <a-option value="month">月份选择</a-option>
      <a-option value="quarter">季度选择</a-option>
      <a-option value="year">年份选择</a-option>
      <a-option value="date-range">日期范围选择</a-option>
      <a-option value="week-range">周范围选择</a-option>
      <a-option value="month-range">月份范围选择</a-option>
      <a-option value="quarter-range">季度范围选择</a-option>
      <a-option value="year-range">年份范围选择</a-option>
    </a-select>
  </a-form-item>
  <a-form-item label="默认值">
    <!-- eslint-disable vue/valid-v-model -->
    <a-input
      v-if="!widget.mode.includes('range')"
      v-model="(widget.defaultValue as string)"
      allow-clear
    />
    <!-- eslint-enable vue/valid-v-model -->
    <template v-else>
      <a-input v-model="(widget.defaultValue as string[])[0]" allow-clear />
      <a-input
        v-model="(widget.defaultValue as string[])[1]"
        style="margin-top: 8px"
        allow-clear
      />
    </template>
  </a-form-item>
  <a-form-item label="日期格式">
    <a-input v-model="widget.format" default-value="YYYY-MM-DD" allow-clear />
  </a-form-item>
  <a-form-item label="宽度">
    <a-input
      v-model="widget.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="提示文字">
    <!-- eslint-disable vue/valid-v-model -->
    <a-input
      v-if="!widget.mode.includes('range')"
      v-model="(widget.placeholder as string)"
      allow-clear
    />
    <!-- eslint-enable vue/valid-v-model -->
    <template v-else>
      <a-input v-model="(widget.placeholder as string[])[0]" allow-clear />
      <a-input
        v-model="(widget.placeholder as string[])[1]"
        style="margin-top: 8px"
        allow-clear
      />
    </template>
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否只读</span>
    <a-switch v-model="widget.readonly" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否必填</span>
    <a-switch v-model="widget.required" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">允许清除</span>
    <a-switch v-model="widget.allowClear" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { ConfigDatePicker } from '@/types/widget'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigDatePicker>,
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

<style lang="scss" scoped>
.extra-info {
  display: flex;
  align-items: center;
  cursor: default;
  .icon {
    margin-left: 4px;
    font-size: 16px;
  }
}
</style>
