import { DataSourceOpts } from './data-source'
import { WidgetActionConfig } from './action'

// #region options
type InteractiveStateOpts = {
  required?: boolean
  disabled?: boolean
  readonly?: boolean
}

type CommonOpts = {
  label?: string
  width?: string
  fieldName?: string
  labelSpan?: number
  wrapperSpan?: number
  hideByDefault?: boolean
  hideLabel?: boolean
}

type CascaderOption = {
  label?: string
  value?: string
  children?: CascaderOption[]
}

export type CommonValue = {
  label?: string
  value: string
}

type ValidationTrigger = 'input' | 'change' | 'blur' | 'focus'

type ValidationOpts = {
  rules?: string
  trigger?: ValidationTrigger[]
}

type EventActionOpts = {
  actions: WidgetActionConfig
}

export type OptInput = {
  defaultValue?: string
  allowClear?: boolean
  maxLength?: number
  showWordLimit?: boolean
  placeholder?: string
  prefix?: string
  suffix?: string
} & CommonOpts &
  InteractiveStateOpts &
  ValidationOpts &
  EventActionOpts

export type OptInputNumber = {
  defaultValue?: number
  allowClear?: boolean
  min?: number
  max?: number
  placeholder?: string
  precision?: number
  step?: number
  prefix?: string
  suffix?: string
} & CommonOpts &
  InteractiveStateOpts &
  ValidationOpts &
  EventActionOpts

export type OptInputTag = {
  defaultValue: string[]
  allowClear?: boolean
  placeholder?: string
  limit?: number
  prefix?: string
  suffix?: string
} & CommonOpts &
  InteractiveStateOpts &
  ValidationOpts &
  EventActionOpts

export type OptTextarea = {
  defaultValue?: string
  allowClear?: boolean
  showWordLimit?: boolean
  maxLength?: number
  minRows?: number
  maxRows?: number
  placeholder?: string
} & InteractiveStateOpts &
  CommonOpts &
  ValidationOpts &
  EventActionOpts

export type OptSelect = {
  defaultValue?: string | string[]
  allowClear?: boolean
  allowSearch?: boolean
  allowCreate?: boolean
  limit?: number
  placeholder?: string

  // if configured, will enable remote search and automatically fetch
  // data from this url, using remoteSearchMethod.
  remoteSearchUrl?: string
  remoteSearchMethod: 'get' | 'post'
} & CommonOpts &
  InteractiveStateOpts &
  ValidationOpts &
  DataSourceOpts<CommonValue[]> &
  EventActionOpts

export type OptRadio = {
  defaultValue?: string
  type?: 'radio' | 'button'
  direction?: 'horizontal' | 'vertical'
} & Omit<InteractiveStateOpts, 'readonly'> &
  CommonOpts &
  ValidationOpts &
  DataSourceOpts<CommonValue[]> &
  EventActionOpts

export type OptCheckbox = {
  defaultValue: string[]
  direction?: 'horizontal' | 'vertical'
} & Omit<InteractiveStateOpts, 'readonly'> &
  CommonOpts &
  ValidationOpts &
  DataSourceOpts<CommonValue[]> &
  EventActionOpts

export type OptSwitch = {
  defaultValue?: boolean
  checkedValue?: string
  uncheckedValue?: string
  checkedColor?: string
  uncheckedColor?: string
  type?: 'circle' | 'round' | 'line'
} & Omit<InteractiveStateOpts, 'readonly'> &
  Omit<CommonOpts, 'width'> &
  ValidationOpts &
  EventActionOpts

export type OptRate = {
  defaultValue?: number
  count?: number
  allowHalf?: boolean
  color?: string
  grading?: boolean
} & InteractiveStateOpts &
  Omit<CommonOpts, 'width'> &
  ValidationOpts &
  EventActionOpts

export type OptSlider = {
  defaultValue?: number | [number, number]
  step?: number
  min?: number
  max?: number
  showTicks?: boolean
  range?: boolean
  marks?: string
} & Omit<InteractiveStateOpts, 'readonly'> &
  CommonOpts &
  ValidationOpts &
  EventActionOpts

export type OptCascader = {
  defaultValue?: string
  allowClear?: boolean
  allowSearch?: boolean
  placeholder?: string
  limit?: number
  strict?: boolean
  pathSelection?: boolean
} & Omit<InteractiveStateOpts, 'readonly'> &
  CommonOpts &
  ValidationOpts &
  DataSourceOpts<CascaderOption[]> &
  EventActionOpts

export type OptDatePicker = {
  defaultValue?: string | string[]
  allowClear?: boolean
  placeholder?: string | string[]
  format?: string
  mode:
    | 'date'
    | 'week'
    | 'month'
    | 'quarter'
    | 'year'
    | 'date-range'
    | 'week-range'
    | 'month-range'
    | 'quarter-range'
    | 'year-range'
} & InteractiveStateOpts &
  CommonOpts &
  ValidationOpts &
  EventActionOpts

export type OptUpload = {
  action?: string
  multiple?: boolean
  tip?: string
  listType?: 'text' | 'picture' | 'picture-card'
  headers?: string
  data?: string
  withCookie?: boolean
  limit?: number
  accept?: string
  beforeUpload?: string
  beforeRemove?: string
  autoUpload?: boolean
} & Omit<InteractiveStateOpts, 'readonly'> &
  CommonOpts &
  ValidationOpts

export type OptGrid = {
  width?: string
  gutter?: number
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  align?: 'start' | 'center' | 'end' | 'stretch'
  hideByDefault?: boolean
}

export type OptGridCol = {
  span?: number
  widgets: Widget[]
}

export type OptTab = {
  width?: string
  type?: 'line' | 'card' | 'card-gutter' | 'text' | 'rounded' | 'capsule'
  size?: 'mini' | 'small' | 'medium' | 'large'
  hideByDefault?: boolean
}

export type OptTabPane = {
  name?: string
  widgets: Widget[]
}

// #endregion

// #region configs
type OptsMap = {
  input: OptInput
  inputNumber: OptInputNumber
  inputTag: OptInputTag
  textarea: OptTextarea
  select: OptSelect
  radio: OptRadio
  checkbox: OptCheckbox
  switch: OptSwitch
  rate: OptRate
  slider: OptSlider
  cascader: OptCascader
  datePicker: OptDatePicker
  upload: OptUpload
  grid: OptGrid
  gridCol: OptGridCol
  tab: OptTab
  tabPane: OptTabPane
}

type ConfigOf<T extends keyof OptsMap> = {
  name: string
  type: T
  uid: string
  config: OptsMap[T]
}

export type ConfigInput = ConfigOf<'input'>
export type ConfigInputNumber = ConfigOf<'inputNumber'>
export type ConfigInputTag = ConfigOf<'inputTag'>
export type ConfigTextarea = ConfigOf<'textarea'>
export type ConfigSelect = ConfigOf<'select'>
export type ConfigRadio = ConfigOf<'radio'>
export type ConfigCheckbox = ConfigOf<'checkbox'>
export type ConfigSwitch = ConfigOf<'switch'>
export type ConfigRate = ConfigOf<'rate'>
export type ConfigSlider = ConfigOf<'slider'>
export type ConfigCascader = ConfigOf<'cascader'>
export type ConfigDatePicker = ConfigOf<'datePicker'>
export type ConfigUpload = ConfigOf<'upload'>
export type ConfigGrid = ConfigOf<'grid'> & {
  cols: OptGridCol[]
}
export type ConfigTab = ConfigOf<'tab'> & {
  panes: OptTabPane[]
}

export type Widget =
  | ConfigInput
  | ConfigInputNumber
  | ConfigInputTag
  | ConfigTextarea
  | ConfigSelect
  | ConfigRadio
  | ConfigCheckbox
  | ConfigSwitch
  | ConfigRate
  | ConfigSlider
  | ConfigCascader
  | ConfigDatePicker
  | ConfigUpload
  | ConfigGrid
  | ConfigTab
// #endregion

export type WidgetName = keyof OptsMap

export type LayoutWidget = ConfigGrid | ConfigTab

export type FormWidget = Exclude<Widget, LayoutWidget>

export type NormalFormWidget = Exclude<FormWidget, ConfigUpload>
