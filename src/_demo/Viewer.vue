<template>
  <FormViewer ref="viewer" :form-data="form" :schema="schema" />
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import FormViewer from '@/components/FormViewer.vue'
import { Schema } from '@/types/builder'

const viewer = ref()
const form = ref({})

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

onMounted(() => {
  const saved = window.localStorage.getItem('schema')
  if (saved) {
    schema.value = JSON.parse(saved)

    nextTick(() => {
      viewer.value.setFormData({
        sel: 'option 2',
      })
    })
  }
})
</script>
