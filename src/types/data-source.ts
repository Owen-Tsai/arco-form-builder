export type DataSourceType = 'static' | 'remote' | 'variable'

export type DataSourceRemoteEntry = {
  name: string
  type: 'get' | 'post'
  url: string
}

export type DataSourceVariableEntry = {
  value: any[]
}

export type RemoteDataSource = DataSourceRemoteEntry[]

export type VariableDataSource = Record<string, DataSourceVariableEntry>

export type DataSourceOpts<T> = {
  dataSourceType: DataSourceType
  dataSource: RemoteDataSource | VariableDataSource | T
}
