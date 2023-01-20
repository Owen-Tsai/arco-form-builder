import { inject } from 'vue'
import { FormData, formDataCtxKey } from '@/types/builder'

const useFormInjection = () => {
  const form = inject<FormData>(formDataCtxKey) as FormData

  return { form }
}

export default useFormInjection
