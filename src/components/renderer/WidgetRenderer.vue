<template>
  <template v-if="widget.type === 'grid'">
    <!-- grid: allow normal form components as children -->
    <a-row
      v-if="visible"
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
          v-if="
            col.widgets.length > 0 && col.widgets[0] !== undefined && visible
          "
          :widget="col.widgets[0]"
          :data-c-field="widget.uid"
        />
      </a-col>
    </a-row>
  </template>
  <template v-else-if="widget.type === 'tab'">
    <!-- tabs: allow grid and normal components as children -->
    <a-tabs
      v-if="visible"
      :type="widget.config.type"
      :data-c-field="widget.uid"
    >
      <a-tab-pane v-for="(pane, i) in widget.panes" :key="i" :title="pane.name">
        <template v-for="nestedWidget in pane.widgets" :key="nestedWidget.uid">
          <WidgetRenderer
            v-if="nestedWidget !== undefined && visible"
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
      v-if="visible"
      :widget="widget"
      :data-c-field="widget.uid"
    />
  </template>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { Widget } from '@/types/widget'
import emitter from '@/utils/event-bus'
import FormWidgetRenderer from './widgets/Index.vue'

const props = defineProps({
  widget: {
    type: Object as PropType<Widget>,
    required: true,
  },
})

const visible = ref(true)

if (props.widget.config.hideByDefault) {
  visible.value = false
}

emitter.on('widget:show', (uid) => {
  console.log('received widget:show')
  console.log(`my uid is ${props.widget.uid}`)
  if (props.widget.uid === uid) {
    console.log('change visibility')
    visible.value = true
    console.log(visible.value)
  }
})
emitter.on('widget:hide', (uid) => {
  if (props.widget.uid === uid) {
    visible.value = false
  }
})
</script>

<script lang="ts">
export default {
  name: 'WidgetRenderer',
}
</script>
