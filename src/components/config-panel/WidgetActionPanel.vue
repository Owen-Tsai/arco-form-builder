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
    <template #title>表单控件动作设置</template>
    <div class="config-container">
      <!-- left -->
      <div class="item-list-wrapper">
        <div
          v-for="(item, i) in schema.widgetActionConfig"
          :key="i"
          :class="[
            'item',
            {
              'is-active': activeIndex === i,
            },
          ]"
          :data-idx="activeIndex"
          @click="activeIndex = i"
        >
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="shadow-item" @click="addEntry">
          <IconPlus />
          新增动作
        </div>
      </div>
      <!-- right -->
      <div class="item-form">
        <a-form v-if="activeItem" :model="activeItem">
          <a-form-item label="名称">
            <a-input v-model="activeItem.name" />
          </a-form-item>
          <a-form-item label="函数体">
            <Codemirror
              v-model="activeItem.functionBody"
              :tab-size="2"
              :extensions="[javascript()]"
              class="codemirror-editor"
              style="height: 120px"
            />
          </a-form-item>
          <a-form-item>
            <a-button status="danger" @click="removeEntry">移除动作</a-button>
          </a-form-item>
        </a-form>
        <a-empty v-else description="请添加一个动作" />
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, inject, computed, onMounted } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { FormBuilderContext, formBuilderCtxKey } from '@/types/builder'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  active: String,
})

const { schema } = inject<FormBuilderContext>(
  formBuilderCtxKey
) as FormBuilderContext

const emit = defineEmits(['close'])

const activeIndex = ref<number | undefined>(
  schema.widgetActionConfig.length === 0 ? undefined : 0
)
const activeItem = computed({
  get: () =>
    activeIndex.value === undefined
      ? undefined
      : schema.widgetActionConfig[activeIndex.value],
  set: (val) => {
    if (activeIndex.value === undefined || val === undefined) return
    schema.widgetActionConfig[activeIndex.value] = val
  },
})

const addEntry = () => {
  schema.widgetActionConfig.push({
    name: '新函数',
    functionBody: '',
  })
}

const removeEntry = () => {
  if (activeIndex.value === undefined) return
  schema.widgetActionConfig.splice(activeIndex.value, 1)
}

const close = () => {
  emit('close')
}

onMounted(() => {
  if (props.active) {
    const idx = schema.widgetActionConfig.findIndex(
      (e) => e.name === props.active
    )
    activeIndex.value = idx === -1 ? undefined : idx
  }
})
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
    padding: 4px 15px;
    @include ellipsis;

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

.name {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
  overflow: hidden;
}

.codemirror-editor {
  border: 1px solid var(--color-border-2);
  width: 100%;
}
</style>
