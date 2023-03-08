import { WidgetActionConfig, ActionEvent } from '@/types/action'
import { safeEval } from '@/utils'
import { useBuilderContext } from '@/hooks/use-context'

const useEvents = (actions: WidgetActionConfig) => {
  const { schema } = useBuilderContext()

  const handler = (args: any, action: ActionEvent) => {
    try {
      const func = schema.widgetActionConfig.filter(
        (e) => e.name === actions[action]
      )
      const argsDef = `let val = ${args};`
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
