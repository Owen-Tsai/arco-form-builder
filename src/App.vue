<template>
  <FormBuilder :schema="schema" />
  <!-- <div class="demo-viewer">
    <FormViewer :schema="schema" :form-data="form" />
  </div> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import FormBuilder from './components/FormBuilder.vue'
import FormViewer from './components/FormViewer.vue'

const schema = ref()
const form = ref({})

// load saved schema
const savedSchema = localStorage.getItem('schema')

if (savedSchema) {
  schema.value = JSON.parse(savedSchema)
}
</script>

<style lang="scss">
// for demo page only!
#app {
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: #f8fafc;

  * {
    box-sizing: border-box;
  }
}
</style>

<style lang="scss" scoped>
.demo-viewer {
  width: 90vw;
  margin: 5vh auto;
  background-color: #fff;
  padding: 24px;
}
</style>
