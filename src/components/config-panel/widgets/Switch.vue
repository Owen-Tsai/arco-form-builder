<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.uid" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.config.label" allow-clear />
  </a-form-item>
  <a-form-item label="默认值">
    <a-switch v-model="widget.config.defaultValue" />
  </a-form-item>
  <a-form-item label="开启时的颜色">
    <a-input
      v-model="widget.config.checkedColor"
      placeholder="合法的CSS颜色值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="关闭时的颜色">
    <a-input
      v-model="widget.config.uncheckedColor"
      placeholder="合法的CSS颜色值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="开关类型">
    <a-select v-model="widget.config.type" allow-clear>
      <a-option value="circle">圆形</a-option>
      <a-option value="line">线形</a-option>
      <a-option value="round">方形</a-option>
    </a-select>
  </a-form-item>
  <div
    class="boolean-config-field"
    :style="useCustomValues ? { marginBottom: '16px' } : undefined"
  >
    <span class="label">使用自定义值</span>
    <a-switch v-model="useCustomValues" />
  </div>
  <template v-if="useCustomValues">
    <a-form-item label="开启时的值">
      <a-input v-model="widget.config.checkedValue" allow-clear />
    </a-form-item>
    <a-form-item label="关闭时的值">
      <a-input v-model="widget.config.uncheckedValue" allow-clear />
    </a-form-item>
  </template>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.config.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否必填</span>
    <a-switch v-model="widget.config.required" />
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
import { ref, computed, PropType } from 'vue'
import { ConfigSwitch } from '@/types/widget'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigSwitch>,
    required: true,
  },
})

const widget = computed({
  get: () => props.config,
  set: (val) => {
    emit('update:config', val)
  },
})

const useCustomValues = ref(false)
</script>
