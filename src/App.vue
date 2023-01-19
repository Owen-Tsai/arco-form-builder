<template>
  <div class="page">
    <aside>
      <Stencil />
    </aside>
    <main>
      <Canvas :scheme="scheme" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Scheme } from '@/types/builder'
import Stencil from './components/stencil/Stencil.vue'
import Canvas from './components/private/Canvas.vue'
import Item from './_demo/DraggableItemDemo.vue'

const scheme = ref<Scheme>({
  dataSourcesConfig: {
    remote: [],
    variable: {},
  },
  formConfig: {},
  formData: {},
  widgetsConfig: [],
})
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
