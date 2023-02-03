import { ref, inject } from 'vue'
import axios from 'axios'
import {
  DataSourceRemoteEntry,
  VariableDataSource,
  DataSourceType,
} from '@/types/data-source'

export const useRemoteData = <T>(source: DataSourceRemoteEntry) => {
  const { type, url } = source
  const data = ref<T>()

  axios({
    method: type,
    url,
  }).then((res) => {
    data.value = res.data
  })

  return data
}

export const useDataSource = <T>(
  type: DataSourceType,
  dataSource: string | DataSourceRemoteEntry | T
) => {
  const options = ref<T>()
  const variablesMap = inject<VariableDataSource>(
    'variables-map'
  ) as VariableDataSource

  if (type === 'static') {
    options.value = dataSource as T
  }
  if (type === 'remote') {
    const data = useRemoteData<T>(dataSource as DataSourceRemoteEntry)
    options.value = data.value
  }
  if (type === 'variable') {
    options.value = variablesMap[dataSource as string].value as T
  }

  return options
}
