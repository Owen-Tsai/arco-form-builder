import { WidgetActionConfig, ActionEvent } from '@/types/action'
import emitter from '@/utils/event-bus'
import { useBuilderContext, useFormData } from '@/hooks/use-context'

const serializeValue = (val: any): string | undefined => {
  if (Array.isArray(val)) {
    let str = '['
    val.forEach((e, i) => {
      if (i !== 0) {
        str += ','
      }
      if (typeof e === 'string') {
        str += `'${e}'`
      } else {
        str += e
      }
    })

    str += ']'

    return str
  }

  if (typeof val === 'string') {
    return `'${val}'`
  }

  if (typeof val === 'object') {
    return JSON.stringify(val)
  }

  return val
}

const useEvents = (uid: string, actions: WidgetActionConfig) => {
  const { schema } = useBuilderContext()
  const { form } = useFormData()

  const val = serializeValue(form.value[uid])
  const serializedForm = serializeValue(form.value)

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
  }

  const handler = (action: ActionEvent) => {
    try {
      const func = schema.widgetActionConfig.filter(
        (e) => e.name === actions[action]
      )
      const argsDef = `const val = ${val}; const formData = ${serializedForm};`
      if (func && func.length === 1) {
        console.log('found matched function')
        // eslint-disable-next-line no-new-func
        const f = new Function(
          'input',
          'argsDef',
          'const body = argsDef + input; eval(body)'
        )
        console.log(f)
        f.call(eventBus, func[0].functionBody, argsDef)
      }
    } catch (e) {
      // nothing
    }
  }
  return { handler }
}

export default useEvents
