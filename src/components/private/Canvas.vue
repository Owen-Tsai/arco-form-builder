<template>
  <div class="canvas">
    <div class="form-container">
      <a-form
        :model="formData"
        :label-align="labelAlign"
        :size="size"
        :layout="layout"
        class="form"
      >
        <Draggable
          :list="widgetsList"
          v-bind="{
            group: 'widgets',
            ghostClass: 'ghost',
            animation: 200,
          }"
          class="draggable-container"
          :swap-threshold="0.05"
          item-key="uid"
        >
          <template #item="{ element }: { element: Widget }">
            <div>{{ element }}</div>
          </template>
        </Draggable>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, toRefs, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { FormData, formDataCtxKey, Scheme } from '@/types/builder'
import { Widget } from '@/types/widget'

const props = defineProps({
  scheme: {
    type: Object as PropType<Scheme>,
    required: true,
  },
})

const { labelAlign, layout, size } = toRefs(props.scheme.formConfig)
const formData = ref<FormData>(props.scheme.formData)
const widgetsList = ref<Widget[]>(props.scheme.widgetsConfig)
</script>

<style lang="scss" scoped>
.canvas,
.form,
.draggable-container {
  height: 100%;
}
.form-container {
  height: 100%;
  padding: 16px 24px;
}
</style>
