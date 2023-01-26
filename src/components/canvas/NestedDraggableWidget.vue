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
  >
    <template #item="{ element, index }: { element: Widget, index: number }">
      <div>
        <a-row
          v-if="element.type === 'grid'"
          class="widget-wrapper !mx-0 !px-2 !py-3 bg-white"
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
            class="relative first:pl-0 last:pr-0 z-10"
            @click="onWrapperClick(index, col)"
          >
            <div class="nested-widget-list bg-green-50">
              <nested-draggable :nested-list="col.widgets" />
            </div>
          </a-col>
          <template v-if="isWidgetSelected(element.uid)">
            <button
              class="widget-action-icon absolute bottom-0 right-0 z-20"
              @click="onWidgetDelete(index)"
            >
              <s-icon :name="DeleteBinFill" :size="16" />
            </button>
            <button
              class="widget-action-icon absolute top-0 left-0 cursor-move drag-handler z-50"
            >
              <s-icon :name="DragMove" :size="16" />
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
import { Widget, OptGridCol } from '@/types/widget'
import { formBuilderCtxKey, FormBuilderContext } from '@/types/builder'

const props = defineProps({
  list: {
    type: Array as PropType<Widget[]>,
    required: true,
  },
})

const widgets = ref(props.list)

const formBuilderCtx = inject<FormBuilderContext>(formBuilderCtxKey)

const isWidgetSelected = (uid: string) => {
  return formBuilderCtx?.selectedWidget.value?.uid === uid
}

const onWidgetSelect = (idx: number) => {
  formBuilderCtx?.setSelectedWidget(widgets.value[idx])
}

const onWidgetDelete = (idx: number) => {
  widgets.value.splice(idx, 1)
}

const onWrapperClick = (idx: number, col: OptGridCol) => {
  if (col.widgets?.length === 0) {
    formBuilderCtx?.setSelectedWidget(widgets.value[idx])
  }
}
</script>
