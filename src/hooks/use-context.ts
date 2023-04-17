import { inject, computed } from 'vue'
import {
  FormDataContext,
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

export const useFormData = () => {
  const { form, resetForm } = inject<FormDataContext>(
    formDataCtxKey
  ) as FormDataContext

  return {
    form,
    resetForm,
  }
}

export const useModelValue = (uid: string, mode: 'dev' | 'prod') => {
  const { form } = useFormData()

  const modelValue = computed({
    get: () => (mode === 'prod' ? form.value[uid] : undefined),
    set: (val) => {
      if (mode === 'prod') {
        form.value[uid] = val
      }
    },
  })

  return {
    modelValue,
  }
}
