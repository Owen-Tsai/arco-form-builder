<template>
  <a-form :model="config" layout="vertical" class="form">
    <Input v-if="config.type === 'input'" :config="config" />
    <InputNumber v-if="config.type === 'inputNumber'" :config="config" />
    <InputTag v-if="config.type === 'inputTag'" :config="config" />
  </a-form>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { Widget } from '@/types/widget'
import Input from './widgets/Input.vue'
import InputNumber from './widgets/InputNumber.vue'
import InputTag from './widgets/InputTag.vue'

const props = defineProps({
  widget: {
    type: Object as PropType<Widget>,
    required: true,
  },
})

const emit = defineEmits(['update:widget'])

const config = computed({
  get: () => props.widget,
  set: (val) => {
    emit('update:widget', val)
  },
})
</script>

<style lang="scss" scoped>
.empty {
  padding: 32px;
  text-align: center;
  color: var(--color-text-3);
}
.form {
  padding: 16px;
}
</style>
