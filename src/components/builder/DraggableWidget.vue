<template>
  <Draggable
    :list="list"
    v-bind="{
      group: 'widgets',
      ghostClass: 'dragging-ghost',
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
          class="widget-wrapper"
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
            @click="onWrapperClick(index, col)"
          >
            <div class="nested-widget-list bg-green-50">
              <DraggableWidget :list="col.widgets" />
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
        <!-- INSERT -->
        <!-- draggable widget-form-item renderer -->
      </div>
    </template>
  </Draggable>
</template>

<script lang="ts" setup>
import { ref, inject, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { DragMove, DeleteBinFill } from '@salmon-ui/icons'
import { Widget } from '@/types/widget'
import { formBuilderCtxKey, FormBuilderContext } from '@/types/builder'
import { useDraggableWidgets } from '@/hooks/use-widgets'
import Icon from '@/components/private/Icon.vue'

const props = defineProps({
  list: {
    type: Array as PropType<Widget[]>,
    required: true,
  },
})

const widgets = ref(props.list)

const context = inject<FormBuilderContext>(formBuilderCtxKey)

const { isWidgetSelected, onWidgetDelete, onWidgetSelect, onWrapperClick } =
  useDraggableWidgets(context, widgets)
</script>
