<template>
  <a-select
    v-model="form[uid]"
    :allow-clear="config.allowClear"
    :allow-create="config.allowCreate"
    :allow-search="config.allowSearch"
    :disabled="config.disabled"
    :limit="config.limit"
    :loading="isLoading"
    :multiple="config.limit !== 0"
    @search="handleSearch"
  >
    <a-option v-for="(opt, i) in options" :key="i" :value="opt.value">
      {{ opt.label }}
    </a-option>
  </a-select>
</template>

<script lang="ts" setup>
import { PropType, inject, ref, toRefs } from 'vue'
import axios from 'axios'
import { OptSelect } from '@/types/widget'
import { DataSourceRemoteEntry, VariableDataSource } from '@/types/data-source'
import useForm from '@/hooks/use-form-injection'
import useLoading from '@/hooks/use-loading'
import { useRemoteData, useVariableData } from '@/hooks/use-data-source'

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
const variablesMap = inject<VariableDataSource>(
  'variables-map'
) as VariableDataSource

const options = ref<Option[]>()

const { dataSource, dataSourceType } = toRefs(props.config)

if (dataSourceType.value === 'static') {
  options.value = dataSource.value as Option[]
}
if (dataSourceType.value === 'remote') {
  const data = useRemoteData(dataSource.value as DataSourceRemoteEntry)
  options.value = data.value
}
if (dataSourceType.value === 'variable') {
  options.value = variablesMap[dataSource.value as string].value as Option[]
}

const { form } = useForm()
const { isLoading, setLoading } = useLoading()

const handleSearch = () => {
  setLoading(true)
  if (
    props.config.remoteSearchUrl &&
    props.config.remoteSearchUrl.trim() !== ''
  ) {
    const { remoteSearchUrl: url, remoteSearchMethod: method } = props.config
    axios({ method, url })
      .then((res) => {
        options.value = res.data as Option[]
      })
      .finally(() => {
        setLoading(false)
      })
  }
}
</script>
