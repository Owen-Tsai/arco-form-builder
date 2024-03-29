<template>
  <Draggable
    :list="list"
    v-bind="{
      group: 'widgets',
      animation: 200,
      handle: '.drag-handler',
    }"
    item-key="uid"
    :swap-threshold="0.1"
  >
    <template #item="{ element, index }: { element: Widget, index: number }">
      <div>
        <a-row
          v-if="element.type === 'grid'"
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
            class="grid-col"
            :span="col.span || 0"
            @click="onWrapperClick(index, col)"
          >
            <div class="draggable-area">
              <NestedWidgetContainer :list="col.widgets" />
            </div>
          </a-col>
          <span class="widget-uid-caption">{{ element.uid }}</span>
          <IconAction
            v-show="isWidgetSelected(element.uid)"
            class="button-tl drag-handler"
            :icon="IconDragArrow"
          />
          <IconAction
            v-show="isWidgetSelected(element.uid)"
            class="button-br"
            :icon="IconDelete"
            @click="onWidgetDelete(index)"
          />
        </a-row>
        <DraggableWidget
          v-if="element.type !== 'grid' && element.type !== 'tab'"
          :widget="element"
          :index="index"
          :parent-widget-list="widgets"
        />
      </div>
    </template>
  </Draggable>
</template>

<script lang="ts" setup>
// only support grid-layout as nested widget container for the moment
import { ref, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { IconDragArrow, IconDelete } from '@arco-design/web-vue/es/icon'
import { Widget } from '@/types/widget'
import { useBuilderInjection } from '@/hooks/use-widgets'
import IconAction from '../private/IconAction.vue'
import DraggableWidget from './DraggableWidget.vue'

const props = defineProps({
  list: {
    type: Array as PropType<Widget[]>,
    required: true,
  },
})

const widgets = ref(props.list)

const { isWidgetSelected, onWidgetDelete, onWidgetSelect, onWrapperClick } =
  useBuilderInjection(widgets)
</script>
