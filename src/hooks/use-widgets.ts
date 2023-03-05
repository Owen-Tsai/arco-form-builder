import { inject, Ref } from 'vue'
import { FormBuilderContext, formBuilderCtxKey } from '@/types/builder'
import { Widget, OptGridCol } from '@/types/widget'

export const widgetsInitConfig: Record<string, Widget> = {
  grid: {
    name: '栅格布局',
    type: 'grid',
    uid: '',
    cols: [
      { span: 12, widgets: [] },
      { span: 12, widgets: [] },
    ],
    config: {},
  },
  tab: {
    name: '标签页',
    type: 'tab',
    uid: '',
    panes: [
      { name: 'Tab 1', widgets: [] },
      { name: 'Tab 2', widgets: [] },
    ],
    config: {},
  },
  input: {
    name: '输入框',
    type: 'input',
    uid: '',
    config: {
      actions: {},
    },
  },
  inputNumber: {
    name: '数字输入框',
    type: 'inputNumber',
    uid: '',
    config: {
      actions: {},
    },
  },
  inputTag: {
    name: '标签输入框',
    type: 'inputTag',
    uid: '',
    config: {
      actions: {},
    },
  },
  textarea: {
    name: '文本域',
    type: 'textarea',
    uid: '',
    config: {
      minRows: 3,
      maxRows: 6,
      actions: {},
    },
  },
  select: {
    name: '下拉选择器',
    type: 'select',
    uid: '',
    config: {
      actions: {},
      dataSourceType: 'static',
      data: {
        static: [
          { label: '选项1', value: 'option 1' },
          { label: '选项2', value: 'option 2' },
        ],
      },
      remoteSearchMethod: 'get',
    },
  },
  radio: {
    name: '单选组合',
    type: 'radio',
    uid: '',
    config: {
      actions: {},
      dataSourceType: 'static',
      data: {
        static: [
          { label: '选项1', value: 'option 1' },
          { label: '选项2', value: 'option 2' },
        ],
      },
    },
  },
  checkbox: {
    name: '复选组合',
    type: 'checkbox',
    uid: '',
    config: {
      actions: {},
      dataSourceType: 'static',
      data: {
        static: [
          { label: '选项1', value: 'option 1' },
          { label: '选项2', value: 'option 2' },
        ],
      },
    },
  },
  switch: {
    name: '开关',
    type: 'switch',
    uid: '',
    config: {
      actions: {},
    },
  },
  rate: {
    name: '评分',
    type: 'rate',
    uid: '',
    config: {
      actions: {},
    },
  },
  slider: {
    name: '滑动输入条',
    type: 'slider',
    uid: '',
    config: {
      actions: {},
    },
  },
  cascader: {
    name: '级联选择器',
    type: 'cascader',
    uid: '',
    config: {
      actions: {},
      dataSourceType: 'static',
      data: {
        static: [
          {
            label: '山东省',
            value: '1',
            children: [
              {
                label: '济南市',
                value: '1-1',
                children: [
                  { label: '历下区', value: '1-1-1' },
                  { label: '市中区', value: '1-1-2' },
                  { label: '历城区', value: '1-1-3' },
                ],
              },
              {
                label: '泰安市',
                value: '1-2',
                children: [
                  { label: '岱岳区', value: '1-2-1' },
                  { label: '泰山区', value: '1-2-2' },
                ],
              },
            ],
          },
          {
            label: '北京市',
            value: '2',
            children: [
              { label: '朝阳区', value: '2-1' },
              { label: '东城区', value: '2-2' },
              { label: '海淀区区', value: '2-3' },
            ],
          },
        ],
      },
    },
  },
  datePicker: {
    name: '日期选择器',
    type: 'datePicker',
    uid: '',
    config: {
      mode: 'date',
      actions: {},
    },
  },
  upload: {
    name: '文件上传',
    type: 'upload',
    uid: '',
    config: {
      type: 'list',
      actions: {},
    },
  },
}

export const widgets = Object.values(widgetsInitConfig)

export const useBuilderInjection = (widgetList: Ref<Widget[]>) => {
  const context = inject<FormBuilderContext>(formBuilderCtxKey)

  const isWidgetSelected = (uid: string) => {
    return context?.selectedWidget.value?.uid === uid
  }

  const onWidgetSelect = (idx: number) => {
    context?.setSelectedWidget(widgetList.value[idx])
  }

  const onWidgetDelete = (idx: number) => {
    widgetList.value.splice(idx, 1)
  }

  const onWrapperClick = (idx: number, col: OptGridCol) => {
    if (col.widgets?.length === 0) {
      context?.setSelectedWidget(widgetList.value[idx])
    }
  }

  return {
    context,
    isWidgetSelected,
    onWidgetDelete,
    onWidgetSelect,
    onWrapperClick,
  }
}
