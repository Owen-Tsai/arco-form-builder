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
    @before-upload="(file) => eventHandler(file, 'beforeUpload')"
    @before-remove="(file) => eventHandler(file, 'beforeRemove')"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Message } from '@arco-design/web-vue'
import { FileItem } from '@arco-design/web-vue/es/upload'
import { OptUpload } from '@/types/widget'
import { useModelValue } from '@/hooks/use-context'
import { functionWrapper } from '@/utils'

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

const eventHandler = (
  arg: File | FileItem,
  field: 'beforeUpload' | 'beforeRemove'
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!props.config[field]) {
      resolve(true)
    } else {
      const argsDef = `let file = ${arg};`
      try {
        // eslint-disable-next-line no-new-func
        const returned = functionWrapper(`${argsDef}${props.config[field]}`)
        if (returned) {
          resolve(true)
        } else {
          Message.error({
            content: '操作终止',
          })
          reject()
        }
      } catch (e) {
        Message.error({
          content: '操作失败',
        })
        console.error(e)
        reject(e)
      }
    }
  })
}
</script>
