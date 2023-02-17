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
    <a-input
      v-if="!widget.mode.includes('range')"
      v-model="form[props.config.uid]"
      allow-clear
    />
    <template v-else>
      <a-input v-model="form[props.config.uid][0]" allow-clear />
      <a-input
        v-model="form[props.config.uid][1]"
        style="margin-top: 8px"
        allow-clear
      />
    </template>
    <template #extra>
      <a-tooltip
        content="该配置项在改变后无法在画布中实时展示效果，如需预览变更请进入预览模式"
        position="br"
      >
        <span class="extra-info">
          该项配置不是响应式的
          <Icon :name="Question" />
        </span>
      </a-tooltip>
    </template>
  </a-form-item>
  <a-form-item label="日期格式">
    <a-input v-model="widget.format" default-value="YYYY-MM-DD" allow-clear />
    <template #extra>
      <a-tooltip
        content="该配置项在改变后无法在画布中实时展示效果，如需预览变更请进入预览模式"
        position="br"
      >
        <span class="extra-info">
          该项配置不是响应式的
          <Icon :name="Question" />
        </span>
      </a-tooltip>
    </template>
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
  <a-form-item label="自定义校验规则">
    <a-textarea
      v-model="widget.rules"
      :auto-size="{ minRows: 4, maxRows: 6 }"
    />
  </a-form-item>
  <a-form-item label="校验触发时机">
    <a-select v-model="widget.trigger" multiple :allow-search="false">
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
import { Question } from '@salmon-ui/icons'
import { inputEvtNames } from '@/utils'
import { ConfigDatePicker } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'
import Icon from '@/components/private/Icon.vue'

const cachedValue = ref<string | string[]>()
const cachedPlaceholder = ref<string | string[]>()

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

const { form } = useFormData()

watch(
  () => widget.value.mode,
  (val) => {
    const t = form[props.config.uid]
    const p = widget.value.placeholder
    const isValueArray = Array.isArray(cachedValue.value)
    const isPlaceholderArray = Array.isArray(cachedPlaceholder.value)

    if (val.includes('range')) {
      form[props.config.uid] = isValueArray ? cachedValue.value : []
      widget.value.placeholder = isPlaceholderArray
        ? cachedPlaceholder.value
        : []
    } else {
      form[props.config.uid] = isValueArray ? '' : cachedValue.value
      widget.value.placeholder = isPlaceholderArray
        ? ''
        : cachedPlaceholder.value
    }
    cachedValue.value = t
    cachedPlaceholder.value = p
  }
)
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
