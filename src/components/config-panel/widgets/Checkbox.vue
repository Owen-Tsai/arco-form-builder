<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.fieldName" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.label" allow-clear />
  </a-form-item>
  <a-form-item label="可选值" style="margin-bottom: 8px">
    <a-radio-group v-model="widget.dataSourceType" size="small">
      <a-radio value="static">固定值</a-radio>
      <a-radio value="variable">变量赋值</a-radio>
      <a-radio value="remote">从接口获取</a-radio>
    </a-radio-group>
  </a-form-item>
  <div v-if="widget.dataSourceType === 'static'" class="value-list">
    <span
      v-for="(item, i) in widget.data.static"
      :key="i"
      class="value-list-item"
    >
      <a-input v-model="widget.data.static[i].label" placeholder="文字" />
      <a-input v-model="widget.data.static[i].value" placeholder="值" />
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
  <div v-else-if="widget.dataSourceType === 'remote'">
    <a-select v-model="widget.data.remote">
      <a-option v-for="(opt, i) in remoteDataSource" :key="i" :value="opt">
        {{ opt.name }}
      </a-option>
    </a-select>
  </div>
  <a-form-item label="默认值" style="margin-top: 16px">
    <a-input
      v-if="widget.dataSourceType !== 'static'"
      v-model="form[props.config.uid]"
      allow-clear
    />
    <a-select v-else v-model="form[props.config.uid]" allow-clear>
      <a-option
        v-for="(opt, i) in widget.data.static"
        :key="i"
        :value="opt.value"
      >
        {{ opt.label || opt.value }}
      </a-option>
    </a-select>
  </a-form-item>
  <a-form-item label="宽度">
    <a-input
      v-model="widget.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item label="排列方式">
    <a-select v-model="widget.direction" default-value="horizontal">
      <a-option value="horizontal">水平排列</a-option>
      <a-option value="vertical">垂直排列</a-option>
    </a-select>
  </a-form-item>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">是否禁用</span>
    <a-switch v-model="widget.disabled" />
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
import { computed, PropType } from 'vue'
import { IconClose } from '@arco-design/web-vue/es/icon'
import { inputEvtNames } from '@/utils'
import { ConfigCheckbox } from '@/types/widget'
import { useFormData, useBuilderContext } from '@/hooks/use-context'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigCheckbox>,
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
const { schema } = useBuilderContext()

const remoteDataSource = computed(() => schema.dataSourcesConfig.remote)

const addOption = () => {
  widget.value.data.static.push({
    label: '',
    value: '',
  })
}

const removeOption = (idx: number) => {
  widget.value.data.static.splice(idx, 1)
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
