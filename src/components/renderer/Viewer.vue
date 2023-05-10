<template>
  <a-form
    :model="form"
    :label-align="schema.formConfig.labelAlign"
    :layout="schema.formConfig.layout"
    :size="schema.formConfig.size"
    :wrapper-col-props="{ span: schema.formConfig.wrapperSpan, offset: 0 }"
    :label-col-props="{ span: schema.formConfig.labelSpan, offset: 0 }"
  >
    <template v-for="(item, i) in schema.widgetsConfig" :key="i">
      <widget-renderer v-if="item !== undefined" :widget="item" />
    </template>

    <pre>{{ form }}</pre>
  </a-form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Schema } from '@/types/builder'
import { useFormData } from '@/hooks/use-context'
import WidgetRenderer from './WidgetRenderer.vue'

defineProps({
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
})

const { form } = useFormData()
</script>
