<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.uid" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.config.label" allow-clear />
  </a-form-item>
  <a-form-item label="默认值">
    <span v-if="widget.config.range" class="value-range">
      <a-input-number
        v-model="(widget.config.defaultValue as number[])[0]"
        placeholder="起始值"
        allow-clear
      />
      <a-input-number
        v-model="(widget.config.defaultValue as number[])[1]"
        placeholder="终止值"
        allow-clear
      />
    </span>
    <!-- eslint-disable vue/valid-v-model -->
    <a-input-number
      v-else
      v-model="(widget.config.defaultValue as number)"
      allow-clear
    />
    <!-- eslint-enable vue/valid-v-model -->
  </a-form-item>
  <a-form-item label="宽度">
    <a-input
      v-model="widget.config.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="最小值">
    <a-input-number v-model="widget.config.min" />
  </a-form-item>
  <a-form-item label="最大值">
    <a-input-number v-model="widget.config.max" />
  </a-form-item>
  <a-form-item label="滑动步长">
    <a-input-number v-model="widget.config.step" />
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.config.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">显示刻度线</span>
    <a-switch v-model="widget.config.showTicks" />
  </div>
  <div class="boolean-config-field">
    <span class="label">允许选择范围</span>
    <a-switch v-model="widget.config.range" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">默认隐藏</span>
    <a-switch v-model="widget.config.hideByDefault" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, PropType } from 'vue'
import { ConfigSlider } from '@/types/widget'

const emit = defineEmits(['update:config'])

const cachedVal = ref<number | [number, number]>()

const props = defineProps({
  config: {
    type: Object as PropType<ConfigSlider>,
    required: true,
  },
})

const widget = computed({
  get: () => props.config,
  set: (val) => {
    emit('update:config', val)
  },
})

watch(
  () => widget.value.config.range,
  (val) => {
    const t = widget.value.config.defaultValue
    if (val) {
      widget.value.config.defaultValue = cachedVal.value || [0, 0]
    } else {
      widget.value.config.defaultValue = cachedVal.value || 0
    }
    cachedVal.value = t
  }
)
</script>

<style lang="scss" scoped>
.value-range {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
