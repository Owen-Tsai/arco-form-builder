<template>
  <template v-if="widget.type === 'grid'">
    <!-- grid: allow normal form components as children -->
    <a-row
      v-show="!widget.config.hideByDefault"
      :align="widget.config.align"
      :gutter="widget.config.gutter"
      :justify="widget.config.justify"
      :data-c-field="widget.uid"
    >
      <a-col
        v-for="(col, i) in widget.cols"
        :key="i"
        :span="widget.cols[i].span"
      >
        <WidgetRenderer
          v-if="col.widgets.length > 0 && col.widgets[0] !== undefined"
          v-show="!widget.config.hideByDefault"
          :widget="col.widgets[0]"
          :data-c-field="widget.uid"
        />
      </a-col>
    </a-row>
  </template>
  <template v-else-if="widget.type === 'tab'">
    <!-- tabs: allow grid and normal components as children -->
    <a-tabs
      v-show="!widget.config.hideByDefault"
      :type="widget.config.type"
      :data-c-field="widget.uid"
    >
      <a-tab-pane v-for="(pane, i) in widget.panes" :key="i" :title="pane.name">
        <template v-for="nestedWidget in pane.widgets" :key="nestedWidget.uid">
          <WidgetRenderer
            v-if="nestedWidget !== undefined"
            v-show="!widget.config.hideByDefault"
            :widget="nestedWidget"
            :data-c-field="widget.uid"
          />
        </template>
      </a-tab-pane>
    </a-tabs>
  </template>
  <template v-else>
    <!-- normal form components -->
    <FormWidgetRenderer
      v-show="!widget.config.hideByDefault"
      :widget="widget"
      :data-c-field="widget.uid"
    />
  </template>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Widget } from '@/types/widget'
import FormWidgetRenderer from './widgets/Index.vue'

defineProps({
  widget: {
    type: Object as PropType<Widget>,
    required: true,
  },
})
</script>

<script lang="ts">
export default {
  name: 'WidgetRenderer',
}
</script>
