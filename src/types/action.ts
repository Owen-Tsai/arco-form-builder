export type Action = {
  name: string
  functionBody: string
}

export type ActionEvent =
  | 'onChange'
  | 'onInput'
  | 'onClick'
  | 'onFocus'
  | 'onBlur'

export type WidgetActionConfig = {
  [key in ActionEvent]?: string
}
