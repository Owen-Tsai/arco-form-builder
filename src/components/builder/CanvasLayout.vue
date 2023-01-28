<template>
  <a-form
    :model="schema.formData"
    :label-align="schema.formConfig.labelAlign"
    :layout="schema.formConfig.layout"
    :size="schema.formConfig.size"
  >
    <Draggable
      :list="widgets"
      v-bind="{
        group: 'widgets',
        ghostClass: 'dragging-ghost',
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
              <div class="nested-widget-list bg-green-50">
                <NestedDraggable :list="col.widgets" />
              </div>
            </a-col>
            <template v-if="isWidgetSelected(element.uid)">
              <button
                class="widget-action-icon absolute bottom-0 right-0 z-20"
                @click="onWidgetDelete(index)"
              >
                <Icon :name="DeleteBinFill" :size="16" />
              </button>
              <button
                class="widget-action-icon absolute top-0 left-0 cursor-move drag-handler z-50"
              >
                <Icon :name="DragMove" :size="16" />
              </button>
            </template>
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
              <div class="nested-widget-list bg-green-50">
                <NestedDraggable :list="pane.widgets" />
              </div>
            </a-tab-pane>

            <template v-if="isWidgetSelected(element.uid)">
              <button
                class="widget-action-icon absolute bottom-0 right-0 z-20"
                @click="onWidgetDelete(index)"
              >
                <Icon :name="DeleteBinFill" :size="16" />
              </button>
              <button
                class="widget-action-icon absolute top-0 left-0 cursor-move drag-handler z-50"
              >
                <Icon :name="DragMove" :size="16" />
              </button>
            </template>
          </a-tabs>
        </template>
        <template v-else>
          <!-- all widgets using v-if/else directive -->
        </template>
      </template>
    </Draggable>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, inject, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { DragMove, DeleteBinFill } from '@salmon-ui/icons'
import { useDraggableWidgets } from '@/hooks/use-widgets'
import { Schema, FormBuilderContext, formBuilderCtxKey } from '@/types/builder'
import { Widget } from '@/types/widget'
import Icon from '@/components/private/Icon.vue'
import NestedDraggable from './DraggableWidget.vue'

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

const context = inject<FormBuilderContext>(formBuilderCtxKey)

const { isWidgetSelected, onWidgetDelete, onWidgetSelect, onWrapperClick } =
  useDraggableWidgets(context, widgets)
</script>
