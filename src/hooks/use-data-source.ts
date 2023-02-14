import { ref } from 'vue'
import axios from 'axios'
import {
  DataSourceRemoteEntry,
  DataSourceOpts,
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
  dataSourceType: DataSourceType,
  data: DataSourceOpts<T>['data']
) => {
  const options = ref<T>()
  // const variablesMap = inject<VariableDataSource>(
  //   'variables-map'
  // ) as VariableDataSource
  if (dataSourceType === 'static') {
    let result
    const { static: staticData } = data
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
  } else if (dataSourceType === 'remote') {
    const res = useRemoteData<T>(data.remote as DataSourceRemoteEntry)
    options.value = res.value
  } else {
    // TODO
    // dataSourceType === 'variable'
  }

  return options
}
