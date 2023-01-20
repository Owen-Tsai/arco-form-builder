import { ref } from 'vue'

const useLoading = (defaultVal = false) => {
  const isLoading = ref(defaultVal)

  const setLoading = (v: boolean) => {
    isLoading.value = v
  }

  return {
    isLoading,
    setLoading,
  }
}

export default useLoading
