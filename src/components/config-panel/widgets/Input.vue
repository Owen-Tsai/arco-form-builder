<template>
  <a-form-item label="字段标识">
    <a-input v-model="widget.fieldName" allow-clear />
  </a-form-item>
  <a-form-item label="字段标签">
    <a-input v-model="widget.label" allow-clear />
  </a-form-item>
  <a-form-item label="默认值">
    <a-input v-model="form[props.config.uid]" allow-clear />
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
  <a-form-item label="输入长度限制">
    <a-input-number v-model="widget.maxLength" allow-clear />
  </a-form-item>
  <a-form-item label="前缀">
    <a-input v-model="widget.prefix" allow-clear />
  </a-form-item>
  <a-form-item label="后缀">
    <a-input v-model="widget.suffix" allow-clear />
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
    <span class="label">是否显示输入计数</span>
    <a-switch v-model="widget.showWordLimit" />
  </div>
  <div class="boolean-config-field">
    <span class="label">是否必填</span>
    <a-switch v-model="widget.required" />
  </div>
  <div class="boolean-config-field" style="margin-bottom: 16px">
    <span class="label">允许清除</span>
    <a-switch v-model="widget.allowClear" />
  </div>
  <div style="margin-bottom: 16px">
    <div class="label">动作列表</div>
    <div class="action-list-wrapper">
      <div
        v-for="(action, evtName) in widget.actions"
        :key="evtName"
        class="action-container"
      >
        <div class="header">
          {{ evtName }}
          <div class="icons">
            <IconCode />
            <IconDelete @click="deleteAction(evtName)" />
          </div>
        </div>
        <div class="body">
          <a-select v-model="widget.actions[evtName]" size="mini">
            <a-option
              v-for="(act, i) in schema.widgetActionConfig"
              :key="`act-config-${i}`"
              :value="act.name"
            >
              {{ act.name }}
            </a-option>
          </a-select>
        </div>
      </div>
      <a-dropdown @select="(value) => addAction(value as ActionEvent)">
        <a-button long type="outline" style="margin-top: 8px">
          增加动作
        </a-button>
        <template #content>
          <a-doption
            v-for="(opt, i) in ['onChange', 'onBlur', 'onFocus', 'onInput']"
            :key="i"
            :disabled="widget.actions[opt as ActionEvent] !== undefined"
          >
            {{ opt }}
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { IconCode, IconDelete } from '@arco-design/web-vue/es/icon'
import { ConfigInput } from '@/types/widget'
import { ActionEvent } from '@/types/action'
import { useFormData, useBuilderContext } from '@/hooks/use-context'
import WidgetActionPanel from '../WidgetActionPanel.vue'

const emit = defineEmits(['update:config'])

const props = defineProps({
  config: {
    type: Object as PropType<ConfigInput>,
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

const addAction = (act: ActionEvent) => {
  // generate name
  const name = `${act}${props.config.uid}`
  // create new action function
  schema.widgetActionConfig.push({
    name,
    functionBody: '',
  })
  // add to widget config
  widget.value.actions[act] = name
}

const deleteAction = (evt: ActionEvent) => {
  delete widget.value.actions[evt]
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;

.action-list-wrapper {
  margin-top: 8px;
}
.action-container {
  border: 1px solid var(--color-border-3);
  border-radius: 4px;
  color: var(--color-text-1);
  .header {
    padding: 4px 12px;
    border-bottom: 1px dashed var(--color-border-2);
    font-weight: bold;
    @include flex-between;
    .icons {
      @include flex-center;
      flex-shrink: 0;
      font-size: 18px;
      color: var(--color-text-3);

      svg {
        cursor: pointer;
        &:hover {
          color: var(--color-text-1);
        }
        & + svg {
          margin-left: 4px;
        }
      }
    }
  }
  .body {
    @include flex-center-v;
    padding: 8px;
  }

  & + & {
    margin-top: 8px;
  }
}
</style>
