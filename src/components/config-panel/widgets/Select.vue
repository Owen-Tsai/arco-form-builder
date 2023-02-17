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
    <template v-if="widget.dataSourceType !== 'static'">
      <a-input-tag
        v-if="isMultiple"
        v-model="form[props.config.uid]"
        placeholder="按下回车键新增"
      />
      <a-input v-else v-model="form[props.config.uid]" allow-clear />
    </template>
    <a-select
      v-else
      v-model="form[props.config.uid]"
      :multiple="isMultiple"
      allow-clear
    >
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
  <a-form-item label="提示文字">
    <a-input v-model="widget.placeholder" allow-clear />
  </a-form-item>
  <a-form-item label="可选数量">
    <a-input-number
      v-model="widget.limit"
      placeholder="大于 0 时开启多选模式"
    />
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
  <div class="boolean-config-field">
    <span class="label">允许创建</span>
    <a-switch v-model="widget.allowCreate" />
  </div>
  <div class="boolean-config-field">
    <span class="label">允许清除</span>
    <a-switch v-model="widget.allowClear" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">允许搜索</span>
    <a-switch v-model="widget.allowSearch" />
  </div>
  <template v-if="widget.allowSearch">
    <a-form-item label="远程搜索接口">
      <a-input v-model="widget.remoteSearchUrl" allow-clear />
      <template #info>123</template>
    </a-form-item>
    <a-form-item label="远程搜索请求类型">
      <a-select v-model="widget.remoteSearchMethod">
        <a-option value="get">GET</a-option>
        <a-option value="post">POST</a-option>
      </a-select>
    </a-form-item>
  </template>
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
import { IconClose } from '@arco-design/web-vue/es/icon'
import { inputEvtNames } from '@/utils'
import { ConfigSelect } from '@/types/widget'
import { useFormData, useBuilderContext } from '@/hooks/use-context'

const cachedValue = ref<string | string[]>()

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigSelect>,
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

const isMultiple = computed(
  () => !!widget.value.limit && widget.value.limit > 1
)

const addOption = () => {
  widget.value.data.static.push({
    label: '',
    value: '',
  })
}

const removeOption = (idx: number) => {
  widget.value.data.static.splice(idx, 1)
}

watch(
  () => isMultiple.value,
  (val) => {
    const t = form[props.config.uid]
    const isArray = Array.isArray(cachedValue.value)
    if (val) {
      form[props.config.uid] = isArray ? cachedValue.value : []
    } else {
      form[props.config.uid] = isArray ? '' : cachedValue.value
    }
    cachedValue.value = t
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
