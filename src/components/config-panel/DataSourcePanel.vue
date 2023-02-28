<template>
  <a-modal
    :visible="visible"
    :width="700"
    hide-cancel
    :mask-closable="false"
    :closable="false"
    @ok="close"
    @cancel="close"
  >
    <template #title>数据源设置</template>
    <div class="config-container">
      <!-- left -->
      <div class="item-list-wrapper">
        <div
          v-for="(item, i) in schema.dataSourcesConfig.remote"
          :key="i"
          :class="[
            'item',
            {
              'is-active': activeIndex === i,
            },
          ]"
          @click="activeIndex = i"
        >
          <span class="type">{{ item.type }}</span>
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="shadow-item" @click="addEntry">
          <Icon :name="Add" />
          新增数据源
        </div>
      </div>
      <!-- right -->
      <div class="item-form">
        <a-form v-if="activeItem" :model="activeItem">
          <a-form-item label="名称">
            <a-input v-model="activeItem.name" />
          </a-form-item>
          <a-form-item label="请求方式">
            <a-radio-group v-model="activeItem.type">
              <a-radio value="get">get</a-radio>
              <a-radio value="post">post</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="API 地址">
            <a-input v-model="activeItem.url" />
          </a-form-item>
          <a-form-item>
            <a-button status="danger" @click="removeEntry">移除数据源</a-button>
          </a-form-item>
        </a-form>
        <a-empty v-else description="请添加一个数据源" />
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from 'vue'
import { Add } from '@salmon-ui/icons'
import { Schema, FormBuilderContext, formBuilderCtxKey } from '@/types/builder'
import Icon from '@/components/private/Icon.vue'

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const { schema } = inject<FormBuilderContext>(
  formBuilderCtxKey
) as FormBuilderContext

const emit = defineEmits(['close'])

const activeIndex = ref<number | undefined>(
  schema.dataSourcesConfig.remote.length === 0 ? undefined : 0
)
const activeItem = computed({
  get: () =>
    activeIndex.value === undefined
      ? undefined
      : schema.dataSourcesConfig.remote[activeIndex.value],
  set: (val) => {
    if (activeIndex.value === undefined || val === undefined) return
    schema.dataSourcesConfig.remote[activeIndex.value] = val
  },
})

const addEntry = () => {
  schema.dataSourcesConfig.remote.push({
    name: '新数据源',
    type: 'get',
    url: '',
  })
}

const removeEntry = () => {
  if (activeIndex.value === undefined) return
  schema.dataSourcesConfig.remote.splice(activeIndex.value, 1)
}

const close = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;

.config-container {
  display: flex;
}
.item-list-wrapper {
  width: 160px;
  flex-shrink: 0;
  flex-grow: 0;

  .shadow-item {
    border: 1px dashed var(--color-border-4);
    color: var(--color-text-2);
    padding: 4px;
    justify-content: center;

    .icon {
      margin-right: 4px;
    }

    &:hover {
      border-color: rgb(var(--primary-6));
      color: rgb(var(--primary-6));
    }
  }
  .item {
    border: 1px solid var(--color-border-3);
    color: var(--color-text-2);
    .type {
      background-color: rgb(var(--primary-1));
      color: rgb(var(--primary-6));
      font-weight: bold;
      text-transform: uppercase;
      padding: 4px 8px;
      @include rounded-left(4px);
    }
    .name {
      padding: 0 8px;
      @include ellipsis;
    }

    &:hover,
    &.is-active {
      color: rgb(var(--primary-6));
      border-color: rgb(var(--primary-6));
    }
  }
  .item,
  .shadow-item {
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;
  }
}

.item-form {
  flex-grow: 1;
}
</style>
