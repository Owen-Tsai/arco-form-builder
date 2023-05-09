<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.fieldName" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.label" allow-clear />
  </a-form-item>
  <a-form-item label="宽度">
    <a-input
      v-model="widget.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="接受的文件类型">
    <a-input
      v-model="widget.accept"
      placeholder="需填写合法的 HTML 标准值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="URL目标地址">
    <a-input v-model="widget.action" allow-clear />
  </a-form-item>
  <a-form-item label="提示文字">
    <a-input v-model="widget.tip" allow-clear />
  </a-form-item>
  <a-form-item label="文件列表样式">
    <a-select v-model="widget.listType">
      <a-option value="text">文字型</a-option>
      <a-option value="picture">图片型</a-option>
      <a-option value="picture-card">照片墙</a-option>
    </a-select>
  </a-form-item>
  <a-form-item label="上传数量限制">
    <a-input-number
      v-model="widget.limit"
      placeholder="大于1时将允许多选"
      allow-clear
    />
  </a-form-item>
  <div>
    <span class="label">上传请求附加的头信息</span>
    <Codemirror
      v-model="widget.headers"
      :tab-size="2"
      :extensions="[javascript()]"
      class="codemirror-editor"
      style="height: 160px"
    />
  </div>
  <div>
    <span class="label">上传请求附加的数据</span>
    <Codemirror
      v-model="widget.headers"
      :tab-size="2"
      :extensions="[javascript()]"
      class="codemirror-editor"
      style="height: 160px"
    />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否携带 Cookie</span>
    <a-switch v-model="widget.withCookie" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否必填</span>
    <a-switch v-model="widget.required" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">默认隐藏</span>
    <a-switch v-model="widget.hideByDefault" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { ConfigUpload } from '@/types/widget'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigUpload>,
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
.codemirror-editor {
  margin-bottom: 16px;
  margin-top: 8px;
  border: 1px solid var(--color-border-2);
}
</style>
