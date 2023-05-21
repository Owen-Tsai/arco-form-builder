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
      <widget-renderer
        v-if="item !== undefined && !hiddenFields.has(item.uid)"
        :widget="item"
      />
    </template>

    <pre>{{ form }}</pre>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { Schema } from '@/types/builder'
import { useFormData } from '@/hooks/use-context'
import WidgetRenderer from '@/components/renderer/WidgetRenderer.vue'

defineProps({
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
})

const hiddenFields = ref<Set<string>>(new Set())

const { form } = useFormData()

const hide = (uid: string) => {
  hiddenFields.value.add(uid)
}

const show = (uid: string) => {
  hiddenFields.value.delete(uid)
}

const getValues = () => {
  return form.value
}

defineExpose({
  hide,
  show,
  getValues,
})
</script>
