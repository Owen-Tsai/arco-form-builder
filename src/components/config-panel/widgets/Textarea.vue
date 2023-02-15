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
    <a-input v-model="widget.placeholder" allow-clear />
  </a-form-item>
  <a-form-item label="最大字数限制">
    <a-input-number v-model="widget.maxLength" allow-clear />
  </a-form-item>
  <a-form-item label="最小行数">
    <a-input-number v-model="widget.minRows" allow-clear />
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
  <a-form-item label="最大行数">
    <a-input-number v-model="widget.maxRows" allow-clear />
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
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否显示输入计数</span>
    <a-switch v-model="widget.showWordLimit" />
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
import { computed, PropType } from 'vue'
import { Question } from '@salmon-ui/icons'
import { inputEvtNames } from '@/utils'
import { ConfigTextarea } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'
import Icon from '@/components/private/Icon.vue'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigTextarea>,
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
