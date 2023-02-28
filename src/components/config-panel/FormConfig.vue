<template>
  <a-form :model="config" layout="vertical" class="form">
    <a-form-item label="表单尺寸">
      <a-select v-model="config.size">
        <a-option label="mini" />
        <a-option label="small" />
        <a-option label="medium" />
        <a-option label="large" />
      </a-select>
    </a-form-item>
    <a-form-item label="表单布局">
      <a-select v-model="config.layout">
        <a-option label="horizontal" />
        <a-option label="vertical" />
      </a-select>
    </a-form-item>
    <a-form-item v-show="config.layout === 'horizontal'" label="标签宽度占比">
      <a-input-number v-model="config.labelSpan" hide-button>
        <template #suffix>/24</template>
      </a-input-number>
    </a-form-item>
    <a-form-item v-show="config.layout === 'horizontal'" label="控件宽度占比">
      <a-input-number v-model="config.wrapperSpan" hide-button>
        <template #suffix>/24</template>
      </a-input-number>
    </a-form-item>
    <a-form-item label="标签对齐方式">
      <a-select v-model="config.labelAlign">
        <a-option label="left" />
        <a-option label="right" />
      </a-select>
    </a-form-item>
    <a-form-item label="数据源">
      <a-button long @click="dataSourcePanelVisible = true">
        数据源设置
      </a-button>
      <DataSourcePanel
        :visible="dataSourcePanelVisible"
        @close="dataSourcePanelVisible = false"
      />
    </a-form-item>
    <a-form-item label="动作">
      <a-button long @click="widgetActionPanelVisible = true">
        表单组件动作设置
      </a-button>
    </a-form-item>
    <WidgetActionPanel
      :visible="widgetActionPanelVisible"
      @close="widgetActionPanelVisible = false"
    />
  </a-form>
</template>

<script lang="ts" setup>
import { ref, PropType, computed } from 'vue'
import { FormConfig } from '@/types/builder'
import DataSourcePanel from './DataSourcePanel.vue'
import WidgetActionPanel from './WidgetActionPanel.vue'

const dataSourcePanelVisible = ref(false)
const widgetActionPanelVisible = ref(false)

const props = defineProps({
  config: {
    type: Object as PropType<FormConfig>,
    required: true,
  },
})

const emit = defineEmits(['update:config'])

const config = computed({
  get: () => props.config,
  set: (val) => {
    emit('update:config', val)
  },
})
</script>

<style lang="scss" scoped>
.form {
  padding: 16px;
}
</style>
