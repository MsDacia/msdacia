<template>
  <div id="app">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  padding-top: 80px; // Space for fixed header
}

// Global styles
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.hide-content {
  display: none;
}

.show-content {
  display: block;
}
</style>