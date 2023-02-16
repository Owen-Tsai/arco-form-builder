<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.fieldName" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.label" allow-clear />
  </a-form-item>
  <a-form-item label="默认值">
    <span v-if="widget.range" class="value-range">
      <a-input-number
        v-model="form[props.config.uid][0]"
        placeholder="起始值"
        allow-clear
      />
      <a-input-number
        v-model="form[props.config.uid][1]"
        placeholder="终止值"
        allow-clear
      />
    </span>
    <a-input-number v-else v-model="form[props.config.uid]" allow-clear />
  </a-form-item>
  <a-form-item label="宽度">
    <a-input
      v-model="widget.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="最小值">
    <a-input-number v-model="widget.min" />
  </a-form-item>
  <a-form-item label="最大值">
    <a-input-number v-model="widget.max" />
  </a-form-item>
  <a-form-item label="滑动步长">
    <a-input-number v-model="widget.step" />
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">显示刻度线</span>
    <a-switch v-model="widget.showTicks" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">允许选择范围</span>
    <a-switch v-model="widget.range" />
  </div>
  <a-form-item label="自定义校验规则">
    <a-textarea
      v-model="widget.rules"
      :auto-size="{ minRows: 4, maxRows: 6 }"
    />
  </a-form-item>
  <a-form-item label="校验触发时机">
    <a-select v-model="widget.trigger" :allow-search="false" multiple>
      <a-option
        v-for="opt in inputEvtNames"
        :key="opt"
        :value="opt"
        :label="opt"
      />
    </a-select>
  </a-form-item>
</template>

<script lang="ts" setup>
import { ref, computed, watch, PropType } from 'vue'
import { inputEvtNames } from '@/utils'
import { ConfigSlider } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'

const emit = defineEmits(['update:config'])

const cachedVal = ref<number | number[]>()

const props = defineProps({
  config: {
    type: Object as PropType<ConfigSlider>,
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

watch(
  () => widget.value.range,
  (val) => {
    const t = form[props.config.uid]
    if (val) {
      form[props.config.uid] = cachedVal.value || [0, 0]
    } else {
      form[props.config.uid] = cachedVal.value || 0
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
