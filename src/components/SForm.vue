<template>
  <FormBuilder v-if="mode === 'design'" :schema="schema" />
  <FormViewer v-else :schema="schema" :form-data="formData" />
</template>

<script lang="ts" setup>
import { ref, provide, PropType } from 'vue'
import { Widget } from '@/types/widget'
import {
  Schema,
  formDataCtxKey,
  FormDataContext,
  FormBuilderContext,
  formBuilderCtxKey,
} from '@/types/builder'
import FormBuilder from './FormBuilder.vue'
import FormViewer from './FormViewer.vue'

defineProps({
  mode: {
    type: String as PropType<'design' | 'view'>,
    default: 'design',
  },
})

const schema = ref<Schema>({
  dataSourcesConfig: {
    remote: [],
    variable: {},
  },
  widgetActionConfig: [],
  formConfig: {
    labelAlign: 'left',
    layout: 'vertical',
    size: 'medium',
    labelSpan: 4,
    wrapperSpan: 20,
  },
  widgetsConfig: [],
})

const formData = ref<Record<string, any>>({})

const selectedWidget = ref<Widget>()

const setSelectedWidget = (widget: Widget) => {
  selectedWidget.value = widget
}

// load saved schema
const savedSchema = localStorage.getItem('schema')

if (savedSchema) {
  schema.value = JSON.parse(savedSchema)
}

// inject formData context
const resetForm = () => {
  formData.value = {}
}
provide<FormDataContext>(formDataCtxKey, {
  resetForm,
  form: formData,
})

// inject builderContext
provide<FormBuilderContext>(formBuilderCtxKey, {
  schema: schema.value,
  selectedWidget,
  setSelectedWidget,
})
</script>
