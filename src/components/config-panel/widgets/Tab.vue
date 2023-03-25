<template>
  <a-form-item label="宽度">
    <a-input v-model="widget.config.width" allow-clear />
  </a-form-item>
  <div>
    <span class="label">标签页</span>
    <div class="panes-list">
      <div v-for="(pane, i) in widget.panes" :key="i" class="pane">
        <a-input v-model="pane.name" />
        <a-button status="danger" type="outline" @click="removeTabPane(i)">
          <template #icon>
            <icon-minus />
          </template>
        </a-button>
      </div>
      <a-button long type="outline" class="btn" @click="addTabPane">
        增加标签页
      </a-button>
    </div>
  </div>
  <a-form-item label="标签页样式">
    <a-select v-model="widget.config.type" allow-clear>
      <a-option value="text">纯文字</a-option>
      <a-option value="line">下划线型</a-option>
      <a-option value="card">卡片型</a-option>
      <a-option value="card-gutter">含间距的卡片型</a-option>
      <a-option value="rounded">圆角</a-option>
      <a-option value="capsule">胶囊型</a-option>
    </a-select>
  </a-form-item>
  <a-form-item label="尺寸">
    <a-select v-model="widget.config.size" allow-clear>
      <a-option value="mini">最小</a-option>
      <a-option value="small">小</a-option>
      <a-option value="medium">中等</a-option>
      <a-option value="large">大</a-option>
    </a-select>
  </a-form-item>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { ConfigTab } from '@/types/widget'

const emit = defineEmits(['update:widget'])

const props = defineProps({
  widget: {
    type: Object as PropType<ConfigTab>,
    required: true,
  },
})

const widget = computed({
  get: () => props.widget,
  set: (val) => {
    emit('update:widget', val)
  },
})

const addTabPane = () => {
  const i = widget.value.panes.length
  widget.value.panes.push({
    name: `Tab ${i + 1}`,
    widgets: [],
  })
}

const removeTabPane = (idx: number) => {
  widget.value.panes.splice(idx, 1)
}
</script>

<style lang="scss" scoped>
.pane {
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

.panes-list {
  margin-top: 8px;
  margin-bottom: 16px;

  .btn {
    margin-top: 8px;
  }
}
</style>
