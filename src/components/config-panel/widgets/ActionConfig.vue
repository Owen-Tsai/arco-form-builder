<template>
  <div>
    <div class="label">动作列表</div>
    <div class="action-list-wrapper">
      <div
        v-for="(action, evtName) in config.actions"
        :key="evtName"
        class="action-container"
      >
        <div class="header">
          {{ evtName }}
          <div class="icons">
            <IconCode @click="openModal(evtName)" />
            <IconDelete @click="deleteAction(evtName)" />
          </div>
        </div>
        <div class="body">
          <a-select v-model="config.actions[evtName]" size="mini">
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
            :disabled="config.actions[opt as ActionEvent] !== undefined"
          >
            {{ opt }}
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>

  <WidgetActionPanel
    :visible="panelVisible"
    :active="defaultActiveActionItem"
    @close="onDialogClose"
  />
</template>

<script lang="ts" setup>
import { ref, computed, PropType } from 'vue'
import { IconCode, IconDelete } from '@arco-design/web-vue/es/icon'
import { NormalFormWidget } from '@/types/widget'
import { ActionEvent } from '@/types/action'
import { useBuilderContext } from '@/hooks/use-context'
import WidgetActionPanel from '../WidgetActionPanel.vue'

const panelVisible = ref(false)
const defaultActiveActionItem = ref<string>()

const props = defineProps({
  widget: {
    type: Object as PropType<NormalFormWidget>,
    required: true,
  },
  actions: {
    type: Array as PropType<ActionEvent[]>,
    default: () => ['onChange', 'onInput', 'onFocus', 'onBlur', 'onClick'],
  },
})

const emit = defineEmits(['update:widget'])

const config = computed({
  get: () => props.widget.config,
  set: (val) => {
    emit('update:widget', val)
  },
})

const { schema } = useBuilderContext()

const addAction = (act: ActionEvent) => {
  // generate name
  const name = `${act}${props.widget.uid}`
  // create new action function
  schema.widgetActionConfig.push({
    name,
    functionBody: '',
  })
  // add to widget config
  config.value.actions[act] = name
}

const deleteAction = (evt: ActionEvent) => {
  delete config.value.actions[evt]
}

const openModal = (evt: ActionEvent) => {
  defaultActiveActionItem.value = config.value.actions[evt]
  panelVisible.value = true
}

const onDialogClose = () => {
  panelVisible.value = false

  const events = Object.keys(config.value.actions)
  for (let i = 0; i < events.length; i++) {
    const evtName = events[i] as ActionEvent
    const functionName = config.value.actions[evtName]
    const res = schema.widgetActionConfig.filter(
      (act) => act.name === functionName
    )

    if (res.length <= 0) {
      config.value.actions[evtName] = undefined
    }
  }
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
