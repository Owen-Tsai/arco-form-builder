<template>
  <a-upload
    v-model:file-list="modelValue"
    :accept="config.accept"
    :action="config.action"
    :disabled="config.disabled"
    :list-type="config.listType"
    :multiple="!!config.limit && config.limit > 0"
    :limit="config.limit"
    :with-credentials="config.withCookie"
    :auto-upload="config.autoUpload === undefined ? true : config.autoUpload"
    :headers="JSON.parse(config.headers || '{}')"
    :data="JSON.parse(config.data || '{}')"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { FileItem } from '@arco-design/web-vue/es'
import { OptUpload } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'
import useEvents from '@/hooks/use-events'

const props = defineProps({
  config: {
    type: Object as PropType<OptUpload>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  mode: {
    type: String as PropType<'prod' | 'dev'>,
    default: 'dev',
  },
})

const { modelValue } = useModelValue(props.uid, props.mode)

const onBeforeUpload = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // check if type matches
    const extName = file.type
  })
}
</script>
