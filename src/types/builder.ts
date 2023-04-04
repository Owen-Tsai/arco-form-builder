import { Ref } from 'vue'
import { Widget } from './widget'
import { RemoteDataSource, VariableDataSource } from './data-source'
import { Action } from './action'

export type FormData = Record<string, any>

export const formDataCtxKey = Symbol('formData')

export const formBuilderCtxKey = Symbol('formBuilder')

export type FormConfig = {
  labelAlign?: 'left' | 'right'
  layout?: 'horizontal' | 'vertical'
  size?: 'mini' | 'small' | 'medium' | 'large'
  labelSpan?: number
  wrapperSpan?: number
}

export type WidgetsConfig = Widget[]

export type DataSourceConfig = {
  remote: RemoteDataSource
  variable: VariableDataSource
}

export type WidgetActionConfig = Action[]

export type Schema = {
  formConfig: FormConfig
  widgetsConfig: WidgetsConfig
  dataSourcesConfig: DataSourceConfig
  widgetActionConfig: WidgetActionConfig
}

export type FormBuilderContext = {
  selectedWidget: Ref<Widget | undefined>
  setSelectedWidget: (w: Widget) => void
  schema: Schema
}
