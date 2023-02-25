<template>
  <a-form
    :model="schema.formData"
    :label-align="schema.formConfig.labelAlign"
    :layout="schema.formConfig.layout"
    :size="schema.formConfig.size"
    :wrapper-col-props="{ span: schema.formConfig.wrapperSpan, offset: 0 }"
    :label-col-props="{ span: schema.formConfig.labelSpan, offset: 0 }"
  >
    <Draggable
      :list="widgets"
      v-bind="{
        group: 'widgets',
        animation: 200,
        handle: '.drag-handler',
      }"
      class="draggable-area"
      :swap-threshold="0.1"
      item-key="uid"
    >
      <template #item="{ element, index }: ItemSlot">
        <template v-if="element.type === 'grid'">
          <a-row
            class="widget-wrapper widget-wrapper-grid"
            :class="{
              'is-selected': isWidgetSelected(element.uid),
            }"
            :align="element.config.align"
            :justify="element.config.justify"
            :gutter="element.config.gutter"
            @click.self="onWidgetSelect(index)"
          >
            <a-col
              v-for="(col, i) in element.cols"
              :key="i"
              :span="col.span || 0"
              class="grid-col"
              @click="onWrapperClick(index, col)"
            >
              <div class="draggable-area">
                <NestedWidgetContainer :list="col.widgets" />
              </div>
            </a-col>
            <IconAction
              v-show="isWidgetSelected(element.uid)"
              class="button-tl drag-handler"
              :icon="DragMove"
            />
            <IconAction
              v-show="isWidgetSelected(element.uid)"
              class="button-br"
              :icon="DeleteBinFill"
              @click="onWidgetDelete(index)"
            />
          </a-row>
        </template>
        <template v-else-if="element.type === 'tab'">
          <a-tabs
            :type="element.config.type"
            :size="element.config.size"
            class="widget-wrapper !mx-0 !px-2 !py-3"
            :class="{
              'is-selected': isWidgetSelected(element.uid),
            }"
            @click.self="onWidgetSelect(index)"
          >
            <a-tab-pane
              v-for="(pane, i) in element.panes"
              :key="i"
              :title="pane.name"
              @click="onWrapperClick(index, pane)"
            >
              <div class="draggable-area">
                <NestedWidgetContainer :list="pane.widgets" />
              </div>
            </a-tab-pane>

            <IconAction
              v-show="isWidgetSelected(element.uid)"
              class="button-tl drag-handler"
              :icon="DragMove"
            />
            <IconAction
              v-show="isWidgetSelected(element.uid)"
              class="button-br"
              :icon="DeleteBinFill"
              @click="onWidgetDelete(index)"
            />
          </a-tabs>
        </template>
        <template v-else>
          <DraggableWidget
            :widget="element"
            :index="index"
            :parent-widget-list="widgets"
          />
        </template>
      </template>
    </Draggable>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { DragMove, DeleteBinFill } from '@salmon-ui/icons'
import { useBuilderInjection } from '@/hooks/use-widgets'
import { Schema } from '@/types/builder'
import { Widget } from '@/types/widget'
import IconAction from '@/components/private/IconAction.vue'
import NestedWidgetContainer from './NestedWidgetContainer.vue'
import DraggableWidget from './DraggableWidget.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ItemSlot = {
  element: Widget
  index: number
}

const props = defineProps({
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
})

const widgets = ref<Widget[]>(props.schema.widgetsConfig)

const { isWidgetSelected, onWidgetSelect, onWidgetDelete, onWrapperClick } =
  useBuilderInjection(widgets)
</script>
