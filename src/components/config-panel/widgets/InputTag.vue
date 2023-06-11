<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.uid" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.config.label" allow-clear />
  </a-form-item>
  <div style="margin-bottom: 16px">
    <span class="label">默认值</span>
    <div class="value-list">
      <div
        v-for="(item, i) in widget.config.defaultValue"
        :key="i"
        class="value-list-item"
      >
        <a-input v-model="widget.config.defaultValue[i]" />
        <a-button
          size="small"
          type="outline"
          status="danger"
          style="flex-shrink: 0"
          class="btn"
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
      v-model="widget.config.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="提示文字">
    <a-input v-model="widget.config.placeholder" allow-clear />
  </a-form-item>
  <a-form-item label="最多展示的标签个数">
    <a-input-number v-model="widget.config.limit" allow-clear />
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.config.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否只读</span>
    <a-switch v-model="widget.config.readonly" />
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
import { computed, PropType } from 'vue'
import { IconClose } from '@arco-design/web-vue/es/icon'
import { ConfigInputTag } from '@/types/widget'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigInputTag>,
    required: true,
  },
})

const widget = computed({
  get: () => props.config,
  set: (val) => {
    emit('update:config', val)
  },
})

const add = () => {
  widget.value.config.defaultValue.push('')
}

const removeValueFromList = (idx: number) => {
  widget.value.config.defaultValue.splice(idx, 1)
}
</script>

<style lang="scss" scoped>
.value-list {
  margin-top: 8px;
  &-item {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .btn {
    flex-shrink: 0;
  }
}
</style>
