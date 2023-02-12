<template>
  <div class="config-panel">
    <div class="tab">
      <span
        :class="{ 'is-active': activeTab === 'form' }"
        @click="activeTab = 'form'"
      >
        表单配置
      </span>
      <span
        :class="{ 'is-active': activeTab === 'widgets' }"
        @click="activeTab = 'widgets'"
      >
        组件配置
      </span>
    </div>
    <a-scrollbar style="height: 100%; overflow: auto">
      <div style="padding-bottom: 24px">
        <FormConfig v-show="activeTab === 'form'" :config="schema.formConfig" />
        <template v-if="selectedWidget !== undefined">
          <WidgetConfig
            v-show="activeTab === 'widgets'"
            :widget="selectedWidget"
          />
        </template>
      </div>
    </a-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { Schema } from '@/types/builder'
import { Widget } from '@/types/widget'
import FormConfig from './FormConfig.vue'
import WidgetConfig from './WidgetConfig.vue'

defineProps({
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  selectedWidget: {
    type: Object as PropType<Widget>,
  },
})

const activeTab = ref<'form' | 'widgets'>('widgets')
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  border-bottom: 1px solid var(--color-border-3);

  span {
    width: 50%;
    display: block;
    text-align: center;
    padding: 16px;
    cursor: pointer;

    &:last-child {
      border-left: 1px solid var(--color-border-3);
    }
    &.is-active {
      background-color: rgb(var(--primary-1));
      color: rgb(var(--primary-6));
      font-weight: bold;
    }
    &:not(.is-active):hover {
      background-color: var(--color-fill-1);
    }
  }
}

:deep(.arco-scrollbar),
:deep(.arco-scrollbar-container) {
  height: 100%;
}

.config-panel {
  overflow: hidden;
  height: 100%;
}

.scrollbar-container {
  overflow: auto;
}
</style>
