<template>
  <div class="page">
    <aside>
      <Stencil :components="['input']" />
    </aside>
    <main />
  </div>
</template>

<script lang="ts" setup>
import Stencil from './components/stencil/Stencil.vue'
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  height: 100%;
}
aside {
  width: 236px;
  padding: 16px;
}
main {
  flex-grow: 1;
  background-color: aquamarine;
}
</style>

<style lang="scss">
// for demo page only!
#app {
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
  height: 100vh;

  * {
    box-sizing: border-box;
  }
}
</style>
