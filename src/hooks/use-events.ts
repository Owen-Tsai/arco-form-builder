import { WidgetActionConfig, ActionEvent } from '@/types/action'
import { safeEval } from '@/utils'
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

  return val
}

const useEvents = (uid: string, actions: WidgetActionConfig) => {
  const { schema } = useBuilderContext()
  const { form } = useFormData()

  const handler = (action: ActionEvent) => {
    const val = serializeValue(form[uid])
    try {
      const func = schema.widgetActionConfig.filter(
        (e) => e.name === actions[action]
      )
      const argsDef = `let val = ${val};`
      if (func && func.length === 1) {
        safeEval(`${argsDef}${func[0].functionBody}`)
      }
    } catch (e) {
      // nothing
    }
  }
  return { handler }
}

export default useEvents
