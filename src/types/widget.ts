import { DataSourceOpts } from './data-source'

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
}

type CascaderOption = {
  label?: string
  value?: string
  children?: CascaderOption[]
}

type ValidationTrigger = 'input' | 'change' | 'blur' | 'focus'

type ValidationOpts = {
  rules?: string
  trigger?: ValidationTrigger[]
}

export type OptInput = {
  allowClear?: boolean
  maxLength?: number
  showWordLimit?: boolean
  placeholder?: string
  prefix?: string
  affix?: string
} & CommonOpts &
  InteractiveStateOpts &
  ValidationOpts

export type OptInputNumber = {
  allowClear?: boolean
  min?: number
  max?: number
  placeholder?: string
  precision?: number
  step?: number
  prefix?: string
  affix?: string
} & CommonOpts &
  InteractiveStateOpts &
  ValidationOpts

export type OptInputTag = {
  allowClear?: boolean
  placeholder?: string
  limit?: number
  prefix?: string
  affix?: string
} & CommonOpts &
  InteractiveStateOpts &
  ValidationOpts

export type OptTextarea = {
  allowClear?: boolean
  autoSize?: boolean
  showWordLimit?: boolean
  maxLength?: number
  minRows?: number
  maxRows?: number
  placeholder?: string
} & InteractiveStateOpts &
  CommonOpts &
  ValidationOpts

export type OptSelect = {
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
  DataSourceOpts<
    {
      label: string
      value: string
    }[]
  >

export type OptRadio = {
  type?: 'radio' | 'button'
  direction?: 'horizontal' | 'vertical'
} & Omit<InteractiveStateOpts, 'readonly'> &
  CommonOpts &
  ValidationOpts &
  DataSourceOpts<
    {
      label: string
      value: string
    }[]
  >

export type OptCheckbox = {
  direction?: 'horizontal' | 'vertical'
} & Omit<InteractiveStateOpts, 'readonly'> &
  CommonOpts &
  ValidationOpts &
  DataSourceOpts<
    {
      label: string
      value: string
    }[]
  >

export type OptSwitch = {
  checkedValue?: boolean | string
  uncheckedValue?: boolean | string
  checkedColor?: string
  uncheckedColor?: string
  type?: 'circle' | 'round' | 'line'
} & Omit<InteractiveStateOpts, 'readonly'> &
  Omit<CommonOpts, 'width'> &
  ValidationOpts

export type OptRate = {
  count?: number
  allowHalf?: boolean
  color?: string
} & Omit<InteractiveStateOpts, 'readonly'> &
  Omit<CommonOpts, 'width'> &
  ValidationOpts

export type OptSlider = {
  step?: number
  min?: number
  max?: number
  direction?: 'vertical' | 'horizontal'
  showTicks?: boolean
  range?: boolean
} & Omit<InteractiveStateOpts, 'readonly'> &
  CommonOpts &
  ValidationOpts

export type OptCascader = {
  allowClear?: boolean
  allowSearch?: boolean
  placeholder?: string
  limit?: number
  strict?: boolean
} & InteractiveStateOpts &
  CommonOpts &
  ValidationOpts &
  DataSourceOpts<CascaderOption[]>

export type OptDatePicker = {
  allowClear?: boolean
  placeholder?: string
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
  ValidationOpts

export type OptGrid = {
  width?: string
  gutter?: number
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export type OptGridCol = {
  span?: number
  widgets?: Widget[]
}

export type OptTab = {
  width?: string
  type?: 'line' | 'card' | 'card-gutter' | 'text' | 'rounded' | 'capsule'
  size?: 'mini' | 'small' | 'medium' | 'large'
}

export type OptTabPane = {
  name?: string
  widgets?: Widget[]
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
export type ConfigGrid = ConfigOf<'grid'> & {
  cols: OptGridCol[]
}
export type ConfigGridCol = ConfigOf<'gridCol'>
export type ConfigTab = ConfigOf<'tab'> & {
  panes: OptTabPane[]
}
export type ConfigTabPane = ConfigOf<'tabPane'>

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
  | ConfigGrid
  | ConfigGridCol
  | ConfigTab
  | ConfigTabPane
// #endregion

export type WidgetName = keyof OptsMap

export type LayoutWidget =
  | ConfigGrid
  | ConfigTab
  | ConfigGridCol
  | ConfigTabPane

export type FormWidget = Exclude<Widget, LayoutWidget>
