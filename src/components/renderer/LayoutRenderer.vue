<template>
  <template v-if="widget.type === 'tab'">
    <a-tabs :type="widget.config.type" :style="width">
      <a-tab-pane v-for="(pane, i) in widget.panes" :key="i" :title="pane.name">
        123
      </a-tab-pane>
    </a-tabs>
  </template>
  <template v-else-if="widget.type === 'grid'">
    <a-row
      :align="widget.config.align"
      :justify="widget.config.justify"
      :gutter="widget.config.gutter"
      :style="width"
    >
      <a-col
        v-for="(col, i) in widget.cols"
        :key="i"
        :span="widget.cols[i].span"
      >
        456
      </a-col>
    </a-row>
  </template>
  <template v-else>789</template>
</template>

<script lang="ts" setup>
import { computed, PropType, StyleValue } from 'vue'
import { Widget } from '@/types/widget'

type HasWidthType = {
  width?: string
  [x: string]: any
}

const props = defineProps({
  widget: {
    type: Object as PropType<Widget>,
    required: true,
  },
})

const width = computed<StyleValue | undefined>(() => {
  if ((props.widget.config as HasWidthType).width) {
    return { width: `${(props.widget.config as HasWidthType).width}px` }
  }

  return undefined
})
</script>
