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
    <a-input
      v-if="widget.config.dataSourceType !== 'static'"
      v-model="widget.config.defaultValue"
      allow-clear
    />
    <a-select v-else v-model="widget.config.defaultValue" allow-clear>
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
  <a-form-item label="排列方式">
    <a-select v-model="widget.config.direction" default-value="horizontal">
      <a-option value="horizontal">水平排列</a-option>
      <a-option value="vertical">垂直排列</a-option>
    </a-select>
  </a-form-item>
  <a-form-item label="单选框类型">
    <a-select v-model="widget.config.type" default-value="radio">
      <a-option value="radio">圆形</a-option>
      <a-option value="button">按钮</a-option>
    </a-select>
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.config.disabled" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">默认隐藏</span>
    <a-switch v-model="widget.config.hideByDefault" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { IconClose } from '@arco-design/web-vue/es/icon'
import { ConfigRadio } from '@/types/widget'
import { useBuilderContext } from '@/hooks/use-context'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigRadio>,
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
