<template>
  <!-- <SForm mode="design" /> -->
  <SForm mode="view" />
</template>

<script lang="ts" setup>
import SForm from './components/SForm.vue'
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
