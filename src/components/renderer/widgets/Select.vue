<template>
  <a-select
    v-model="form[uid]"
    :allow-clear="config.allowClear"
    :allow-create="config.allowCreate"
    :allow-search="config.allowSearch"
    :disabled="config.disabled"
    :limit="config.limit"
    :loading="isLoading"
    :multiple="config.limit !== undefined && config.limit > 1"
    :style="{ width: config.width }"
    @search="handleSearch"
  >
    <a-option v-for="(opt, i) in options" :key="i" :value="opt.value">
      {{ opt.label }}
    </a-option>
  </a-select>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import axios from 'axios'
import { OptSelect } from '@/types/widget'
import { useFormData } from '@/hooks/use-context'
import useLoading from '@/hooks/use-loading'
import { useDataSource } from '@/hooks/use-data-source'

type Option = { label: string; value: string }

const props = defineProps({
  config: {
    type: Object as PropType<OptSelect>,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
})

// TODO: provide context variables
const options = useDataSource(props.config.dataSourceType, props.config.data)

const { form } = useFormData()
const { isLoading, setLoading } = useLoading()

const handleSearch = () => {
  setLoading(true)
  if (
    props.config.remoteSearchUrl &&
    props.config.remoteSearchUrl.trim() !== ''
  ) {
    const { remoteSearchUrl: url, remoteSearchMethod: method } = props.config
    axios({
      method,
      url: `${url}?search=${form[props.uid]}`,
    })
      .then((res) => {
        options.value = res.data as Option[]
      })
      .finally(() => {
        setLoading(false)
      })
  }
}
</script>
