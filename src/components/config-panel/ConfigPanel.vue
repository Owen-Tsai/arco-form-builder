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
    <div class="form">
      <FormConfig v-show="activeTab === 'form'" :config="schema.formConfig" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { Schema } from '@/types/builder'
import FormConfig from './FormConfig.vue'

defineProps({
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
})

const activeTab = ref<'form' | 'widgets'>('widgets')
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;

.tab {
  display: flex;
  border-bottom: 1px solid $gray-3;

  span {
    width: 50%;
    display: block;
    text-align: center;
    padding: 16px;
    cursor: pointer;

    &:last-child {
      border-left: 1px solid $gray-3;
    }
    &.is-active {
      background-color: $blue-1;
      color: $blue-6;
      font-weight: bold;
    }
    &:not(.is-active):hover {
      background-color: $gray-1;
    }
  }
}

.form {
  padding: 16px;
}
</style>
