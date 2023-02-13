<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.fieldName" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.label" allow-clear />
  </a-form-item>
  <div style="margin-bottom: 16px">
    <span class="label">默认值</span>
    <div class="value-list">
      <div
        v-for="(item, i) in form[config.uid]"
        :key="i"
        class="value-list-item"
      >
        <a-input v-model="form[config.uid][i]" />
        <a-button
          size="small"
          type="text"
          status="danger"
          @click="removeValueFromList(i)"
        >
          <template #icon>
            <IconClose />
          </template>
        </a-button>
      </div>
    </div>
    <a-button size="small" long type="outline" @click="add">新增</a-button>
  </div>
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
  <a-form-item label="最多展示的标签个数">
    <a-input-number v-model="widget.limit" allow-clear />
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
  <a-form-item label="自定义校验规则" style="margin-top: 16px">
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
import { IconClose } from '@arco-design/web-vue/es/icon'
import { inputEvtNames } from '@/utils'
import { ConfigInputTag } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigInputTag>,
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

const add = () => {
  form[props.config.uid].push('')
}

const removeValueFromList = (idx: number) => {
  ;(form[props.config.uid] as string[]).splice(idx, 1)
}
</script>

<style lang="scss" scoped>
.value-list {
  margin-top: 8px;
  &-item {
    display: flex;
  }
}
</style>
