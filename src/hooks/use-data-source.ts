import { ref } from 'vue'
import axios from 'axios'
import { DataSourceRemoteEntry, DataSourceOpts } from '@/types/data-source'

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

export const useDataSource = <T>(dataSourceOpts: DataSourceOpts<T>) => {
  const options = ref<T>()
  // const variablesMap = inject<VariableDataSource>(
  //   'variables-map'
  // ) as VariableDataSource
  if (dataSourceOpts.dataSourceType === 'static') {
    let result
    const { static: staticData } = dataSourceOpts.data
    if (typeof staticData === 'string') {
      // in this case, the Object string need to be parsed
      try {
        // eslint-disable-next-line no-eval
        result = eval(`_ = ${staticData}`)
      } catch (e) {
        // nothing
      }
      options.value = result as T
    } else {
      // the staticData is of type T
      options.value = staticData
    }
  } else if (dataSourceOpts.dataSourceType === 'remote') {
    const data = useRemoteData<T>(
      dataSourceOpts.data.remote as DataSourceRemoteEntry
    )
    options.value = data.value
  } else {
    // TODO
    // dataSourceType === 'variable'
  }

  return options
}
