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
      <WidgetRenderer v-if="item !== undefined" :widget="item" />
    </template>

    <pre>{{ form }}</pre>
  </a-form>
</template>

<script lang="ts" setup>
import { computed, provide, PropType } from 'vue'
import {
  Schema,
  FormDataContext,
  FormBuilderContext,
  formDataCtxKey,
  formBuilderCtxKey,
} from '@/types/builder'
import WidgetRenderer from '@/components/renderer/WidgetRenderer.vue'

const emit = defineEmits(['update:formData'])

const props = defineProps({
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  formData: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
})

const form = computed({
  get: () => props.formData,
  set: (val) => {
    emit('update:formData', val)
  },
})

provide<FormDataContext>(formDataCtxKey, {
  form,
})
provide<FormBuilderContext>(formBuilderCtxKey, {
  schema: props.schema,
})
</script>
