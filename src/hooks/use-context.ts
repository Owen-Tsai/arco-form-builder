import { inject } from 'vue'
import {
  FormData,
  formDataCtxKey,
  FormBuilderContext,
  formBuilderCtxKey,
} from '@/types/builder'

export const useFormData = () => {
  const form = inject<FormData>(formDataCtxKey) as FormData

  return { form }
}

export const useBuilderContext = () => {
  const { schema, selectedWidget, setSelectedWidget } =
    inject<FormBuilderContext>(formBuilderCtxKey) as FormBuilderContext

  return {
    schema,
    selectedWidget,
    setSelectedWidget,
  }
}
