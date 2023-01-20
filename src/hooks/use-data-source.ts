import { ref } from 'vue'
import axios from 'axios'
import { DataSourceRemoteEntry, VariableDataSource } from '@/types/data-source'

export const useRemoteData = (source: DataSourceRemoteEntry) => {
  const { type, url } = source
  const data = ref<any>()

  axios({
    method: type,
    url,
  }).then((res) => {
    data.value = res.data
  })

  return data
}

export const useVariableData = (
  variableKey: string,
  sources: VariableDataSource
) => {
  return sources[variableKey]
}
