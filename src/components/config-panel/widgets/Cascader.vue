<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.uid" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.config.label" allow-clear />
  </a-form-item>
  <a-form-item label="可选值" style="margin-bottom: 8px">
    <a-radio-group v-model="widget.config.dataSourceType" size="small">
      <a-radio value="static">固定值</a-radio>
      <a-radio value="variable">变量赋值</a-radio>
      <a-radio value="remote">从接口获取</a-radio>
    </a-radio-group>
  </a-form-item>
  <div v-if="widget.config.dataSourceType === 'static'" class="value-list">
    <Codemirror
      v-model="rawJson"
      :tab-size="2"
      :extensions="[javascript()]"
      class="codemirror-editor"
    />
  </div>
  <div v-else-if="widget.config.dataSourceType === 'remote'">
    <a-select v-model="widget.config.data.remote">
      <a-option v-for="(opt, i) in remoteDataSource" :key="i" :value="opt">
        {{ opt.name }}
      </a-option>
    </a-select>
  </div>
  <a-form-item label="默认值" style="margin-top: 16px">
    <a-input v-model="widget.config.defaultValue" allow-clear />
  </a-form-item>
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
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.config.disabled" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否必填</span>
    <a-switch v-model="widget.config.required" />
  </div>
  <div class="boolean-config-field">
    <span class="label">允许清除</span>
    <a-switch v-model="widget.config.allowClear" />
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
import { ref, computed, watch, PropType } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { ConfigCascader } from '@/types/widget'
import { useBuilderContext } from '@/hooks/use-context'

const emit = defineEmits(['update:config'])

const { schema } = useBuilderContext()

const props = defineProps({
  config: {
    type: Object as PropType<ConfigCascader>,
    required: true,
  },
})

const widget = computed({
  get: () => props.config,
  set: (val) => {
    emit('update:config', val)
  },
})

const remoteDataSource = computed(() => schema.dataSourcesConfig.remote)

const rawJson = ref(JSON.stringify(widget.value.config.data.static, null, 2))

watch(
  () => rawJson.value,
  (val) => {
    try {
      widget.value.config.data.static = JSON.parse(val)
    } catch (e) {
      // do nothing
    }
  }
)
</script>

<style lang="scss" scoped>
.value-list {
  &-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    .btn {
      flex-shrink: 0;
    }
  }
}
</style>
