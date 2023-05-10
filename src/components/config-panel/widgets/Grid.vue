<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.uid" allow-clear />
  </a-form-item>
  <a-form-item label="宽度">
    <a-input v-model="widget.config.width" allow-clear />
  </a-form-item>
  <div>
    <span class="label">栅格列</span>
    <div class="cols-list">
      <div v-for="(col, i) in widget.cols" :key="i" class="col">
        <a-input-number v-model="col.span" />
        <a-button status="danger" type="outline" @click="removeColFromGrid(i)">
          <template #icon>
            <icon-minus />
          </template>
        </a-button>
      </div>
      <a-button long type="outline" class="btn" @click="addColToGrid">
        增加列
      </a-button>
    </div>
  </div>
  <a-form-item label="栅格间距">
    <a-input-number v-model="widget.config.gutter" allow-clear />
  </a-form-item>
  <a-form-item label="水平排列方式">
    <a-select v-model="widget.config.justify" allow-clear>
      <a-option value="start">左对齐</a-option>
      <a-option value="center">居中</a-option>
      <a-option value="end">右对齐</a-option>
      <a-option value="space-around">均匀分布</a-option>
      <a-option value="space-between">两端对齐</a-option>
    </a-select>
  </a-form-item>
  <a-form-item label="垂直排列方式">
    <a-select v-model="widget.config.align" allow-clear>
      <a-option value="start">顶部对齐</a-option>
      <a-option value="center">居中</a-option>
      <a-option value="end">底部对齐</a-option>
      <a-option value="stretch">拉伸填充</a-option>
    </a-select>
  </a-form-item>
  <div class="boolean-config-field">
    <span class="label">默认隐藏</span>
    <a-switch v-model="widget.config.hideByDefault" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { sumBy } from 'lodash'
import { ConfigGrid } from '@/types/widget'

const emit = defineEmits(['update:widget'])

const props = defineProps({
  widget: {
    type: Object as PropType<ConfigGrid>,
    required: true,
  },
})

const widget = computed({
  get: () => props.widget,
  set: (val) => {
    emit('update:widget', val)
  },
})

const removeColFromGrid = (index: number) => {
  widget.value.cols.splice(index, 1)
}

const addColToGrid = () => {
  const remains = sumBy(widget.value.cols, (e) => e.span || 0)
  ;(widget.value as ConfigGrid).cols.push({
    span: remains > 0 ? 24 - remains : 0,
    widgets: [],
  })
}
</script>

<style lang="scss" scoped>
.col {
  display: flex;
  align-items: center;
  gap: 8px;

  & + & {
    margin-top: 8px;
  }

  :deep(button) {
    flex-shrink: 0;
  }
}

.cols-list {
  margin-top: 8px;
  margin-bottom: 16px;

  .btn {
    margin-top: 8px;
  }
}
</style>
