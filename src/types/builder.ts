import { Widget } from './widget'
import { RemoteDataSource, VariableDataSource } from './data-source'

export type FormData = Record<string, any>

export const formDataCtxKey = Symbol('formData')

export type FormConfig = {
  labelAlign?: 'left' | 'right'
  layout?: 'horizontal' | 'vertical'
  size?: 'mini' | 'small' | 'medium' | 'large'
}

export type WidgetsConfig = Widget[]

export type DataSourceConfig = {
  remote: RemoteDataSource
  variable: VariableDataSource
}

export type Scheme = {
  formConfig: FormConfig
  widgetsConfig: WidgetsConfig
  dataSourcesConfig: DataSourceConfig
  formData: FormData
}
