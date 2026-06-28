<template>
	<header>
		<SwitchTheme />

		<div class="item" data-test="menu-toggle" @click="showMenu = !showMenu">
			<UIIcon v-show="!showMenu" icon="SVGHamburger" class="toggle off icon" data-test="icon-menu-open" />
			<UIIcon v-show="showMenu" icon="SVGClose" class="toggle on icon" data-test="icon-menu-close" />
		</div>

		<div class="menu" data-test="menu" :class="[showMenu ? 'show-content' : 'hide-content']">
			<router-link
				v-for="headerNav in content.common.navigation"
				:key="headerNav.item"
				class="nav-link"
				data-test="nav-link"
				:to="headerNav.path"
				@click="handleNavClick(headerNav.title)"
			>
				<UIIcon icon="SVGCode" class="icon" /> {{ headerNav.title }}
			</router-link>
		</div>
	</header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UIIcon } from 'ui-components'
import SwitchTheme from './SwitchTheme.vue'
import contentData from '../data/static.en-us.json'

// Reactive data using Composition API (Vue 3 way!)
const content = ref(contentData)
const showMenu = ref(false)

// Methods using Composition API
const handleNavClick = (title: string) => {
	showMenu.value = false
	// Modern analytics will be added later
	console.log('Navigation clicked:', title)
}

// Expose properties for testing
defineExpose({
	content,
	showMenu,
	handleNavClick,
})
</script>

<style lang="scss" scoped>
header {
	grid-area: header;
	padding-bottom: 0;

	.item {
		cursor: pointer;
		overflow: hidden;
		padding: 0;
		pointer-events: all;
		position: absolute;
		right: 30px;
		top: 15px;
		transform: translate(1px, 0);
		transition: all 1s;
		z-index: 1501;

		@include max-width(tablet) {
			display: none;
		}

		[data-ui="icon"] {
			color: var(--color-text);
			font-weight: $weight-black;

			&.on {
				color: var(--color-text-secondary); // Vue green for hover state
			}
		}

		.menu-label {
			color: var(--color-text);

			&.active {
				color: var(--color-text-secondary);
			}
		}
	}

	.menu {
		background: var(--color-background); // Light background
		height: 100%;
		left: 0;
		padding: 50px 30px 40px;
		pointer-events: all;
		position: fixed;
		text-align: center;
		top: 0;
		width: 100%;
		z-index: 1500;

		@include max-width(tablet) {
			background: transparent;
			margin: 0 $size-20;
			padding: 0;
			position: relative;
			width: 90%;
			z-index: inherit;
		}

		&.hide-content {
			display: none;

			@include max-width(tablet) {
				display: inline-block !important;
			}
		}

		&.show-content {
			display: block;
		}

		.nav-link {
			color: var(--color-text);
			cursor: pointer;
			display: inline-block;
			font: normal 1.6em/1.6 serif;
			font-family: "News Cycle", Avenir, Helvetica, Arial, sans-serif;
			letter-spacing: 0.5px;
			margin: 30px 0 0;
			padding: 0 $size-10 5px;
			text-align: left;
			text-decoration: none;

			@include max-width(tablet) {
				margin: 0 0 $size-10;
				padding-bottom: 5px;
				text-align: right;
			}

			&:first-child {
				@include max-width(tablet) {
					margin-left: 0;
					padding-left: 0;
				}
			}

			&.router-link-active,
			&.current {
				.icon {
					animation: blink 2s steps(5, start) infinite;
					color: var(--color-text-secondary);
				}
			}

			&:hover,
			&.router-link-active,
			&.current {
				color: var(--color-text-secondary);

				.icon {
					color: var(--color-text-secondary);
					visibility: visible;
				}
			}

			.icon {
				color: var(--color-text);
				height: $size-12;
				margin-right: 0;
				transition: visibility 1s ease-out;
				visibility: hidden;
				width: $size-12;
			}
		}
	}
}

@keyframes blink {
	0%, 50% { opacity: 1; }
	51%, 100% { opacity: 0; }
}
</style>
