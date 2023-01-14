<template>
  <div class="page">
    <aside>
      <Stencil />
    </aside>
    <main />
  </div>
</template>

<script lang="ts" setup>
import Stencil from './components/private/Stencil.vue'
</script>

<style lang="scss" scoped>
.page {
  display: flex;
}
aside {
  width: 220px;
}
main {
  flex-grow: 1;
  background-color: aquamarine;
}
</style>
