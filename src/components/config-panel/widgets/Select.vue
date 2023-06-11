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
    <span
      v-for="(item, i) in widget.config.data.static"
      :key="i"
      class="value-list-item"
    >
      <a-input
        v-model="widget.config.data.static[i].label"
        placeholder="文字"
      />
      <a-input v-model="widget.config.data.static[i].value" placeholder="值" />
      <a-button
        class="btn"
        status="danger"
        type="outline"
        @click="removeOption(i)"
      >
        <template #icon>
          <IconClose />
        </template>
      </a-button>
    </span>

    <a-button long type="outline" @click="addOption">增加可选值</a-button>
  </div>
  <div v-else-if="widget.config.dataSourceType === 'remote'">
    <a-select v-model="widget.config.data.remote">
      <a-option v-for="(opt, i) in remoteDataSource" :key="i" :value="opt">
        {{ opt.name }}
      </a-option>
    </a-select>
  </div>
  <a-form-item label="默认值" style="margin-top: 16px">
    <template v-if="widget.config.dataSourceType !== 'static'">
      <!-- eslint-disable vue/valid-v-model -->
      <a-input-tag
        v-if="isMultiple"
        v-model="(widget.config.defaultValue as string[])"
        placeholder="按下回车键新增"
      />
      <a-input
        v-else
        v-model="(widget.config.defaultValue as string)"
        allow-clear
      />
      <!-- eslint-enable vue/valid-v-model -->
    </template>
    <a-select
      v-else
      v-model="widget.config.defaultValue"
      :multiple="isMultiple"
      allow-clear
    >
      <a-option
        v-for="(opt, i) in widget.config.data.static"
        :key="i"
        :value="opt.value"
      >
        {{ opt.label || opt.value }}
      </a-option>
    </a-select>
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
  <a-form-item label="可选数量">
    <a-input-number
      v-model="widget.config.limit"
      placeholder="大于 0 时开启多选模式"
    />
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
    <span class="label">允许创建</span>
    <a-switch v-model="widget.config.allowCreate" />
  </div>
  <div class="boolean-config-field">
    <span class="label">允许清除</span>
    <a-switch v-model="widget.config.allowClear" />
  </div>
  <div class="boolean-config-field">
    <span class="label">隐藏标签</span>
    <a-switch v-model="widget.config.hideLabel" />
  </div>
  <div class="boolean-config-field">
    <span class="label">默认隐藏</span>
    <a-switch v-model="widget.config.hideByDefault" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">允许搜索</span>
    <a-switch v-model="widget.config.allowSearch" />
  </div>
  <template v-if="widget.config.allowSearch">
    <a-form-item label="远程搜索接口">
      <a-input v-model="widget.config.remoteSearchUrl" allow-clear />
      <template #extra>123</template>
    </a-form-item>
    <a-form-item label="远程搜索请求类型">
      <a-select v-model="widget.config.remoteSearchMethod">
        <a-option value="get">GET</a-option>
        <a-option value="post">POST</a-option>
      </a-select>
    </a-form-item>
  </template>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { IconClose } from '@arco-design/web-vue/es/icon'
import { ConfigSelect } from '@/types/widget'
import { useBuilderContext } from '@/hooks/use-context'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigSelect>,
    required: true,
  },
})

const widget = computed({
  get: () => props.config,
  set: (val) => {
    emit('update:config', val)
  },
})

const { schema } = useBuilderContext()

const remoteDataSource = computed(() => schema.dataSourcesConfig.remote)

const isMultiple = computed(
  () => !!widget.value.config.limit && widget.value.config.limit > 1
)

const addOption = () => {
  widget.value.config.data.static.push({
    label: '',
    value: '',
  })
}

const removeOption = (idx: number) => {
  widget.value.config.data.static.splice(idx, 1)
}
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
