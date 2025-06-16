<template>
	<SiteHeader />

	<main>
		<RouterView />
	</main>

	<SiteFooter />
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
#app {
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	color: var(--color-text);
}

main {
	grid-area: main;
	overflow-y: auto;
}

// Global styles
* {
	box-sizing: border-box;
	font-family: "News Cycle", Avenir, Helvetica, Arial, sans-serif;
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
