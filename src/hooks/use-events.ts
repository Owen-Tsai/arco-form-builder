import { WidgetActionConfig, ActionEvent } from '@/types/action'
import emitter from '@/utils/event-bus'
import { useBuilderContext, useFormData } from '@/hooks/use-context'

const useEvents = (uid: string, actions: WidgetActionConfig) => {
  const { schema } = useBuilderContext()
  const { form } = useFormData()

  const eventBus = {
    hide(widgetUid: string) {
      emitter.emit('widget:hide', widgetUid)
    },
    show(widgetUid: string) {
      emitter.emit('widget:show', widgetUid)
    },
    getValue() {
      return form.value[uid]
    },
    getFormData() {
      return form.value
    },
    setValue(v: unknown, widget?: string) {
      form.value[widget || uid] = v
    },
    clearField(widget?: string) {
      delete form.value[widget || uid]
    },
    setAttribute(props: Record<string, any>, widget?: string) {
      const target = schema.widgetsConfig.filter((e) => e.uid === widget || uid)
      if (target.length <= 0) return
      Object.keys(props).forEach((k, i) => {
        ;(target[0].config as any)[k] = props[i][k]
      })
    },
  }

  const handler = (action: ActionEvent) => {
    try {
      const func = schema.widgetActionConfig.filter(
        (e) => e.name === actions[action]
      )
      if (func && func.length === 1) {
        // eslint-disable-next-line no-new-func
        const f = new Function('input', 'eval(input)')
        console.log(f)
        f.call(eventBus, func[0].functionBody)
      }
    } catch (e) {
      // nothing
    }
  }
  return { handler }
}

export default useEvents
