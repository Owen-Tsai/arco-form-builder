import { inject } from 'vue'
import {
  FormData,
  formDataCtxKey,
  FormBuilderContext,
  formBuilderCtxKey,
} from '@/types/builder'

export const useBuilderContext = () => {
  const { schema, selectedWidget, setSelectedWidget } =
    inject<FormBuilderContext>(formBuilderCtxKey) as FormBuilderContext

  return {
    schema,
    selectedWidget,
    setSelectedWidget,
  }
}

export const useFormData = (mode = 'dev') => {
  const formProd = inject<FormData>(formDataCtxKey) as FormData
  const formDev = useBuilderContext().schema.formData

  return mode === 'dev'
    ? {
        form: formDev,
      }
    : {
        form: formProd,
        formDev,
      }
}
