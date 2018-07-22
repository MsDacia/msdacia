<template>
	<header v-if="!loading">
		<switch-theme></switch-theme>
		<div class="item" @click="showMenu = !showMenu">
			<i class="toggle off icon" :class="[ showMenu ? 'hide-content' : 'show-content' ]"></i>
			<i class="toggle on icon" :class="[ showMenu ? 'show-content' : 'hide-content' ]"></i>
			<em :class="[ showMenu ? 'active' : '' ]">{{content.common.global.menu}}</em>
		</div>

		<div class="menu" :class="[ showMenu ? 'show-content' : 'hide-content' ]">
			<router-link class="nav-link" v-for="headerNav in content.common.navigation" :key="headerNav.id" :to="'/' + headerNav.item" @click.native="showMenu = false, runAnalytics(headerNav.title)">
				<i class="terminal icon"></i> {{headerNav.title}}
			</router-link>
		</div>
	</header>
</template>

<script>

import firebase from 'firebase/app'
import { db, contentRef } from '@/datastore'
import SwitchTheme from '../components/switch-theme.vue'

export default {

	components: {
		SwitchTheme,
	},

	data() {
		return {
			loading: true,
			showMenu: false,
		}
	},

	firebase: {
		content: {
			source: contentRef,
			asObject: true,
			readyCallback: function () { this.loading = false }
		},
	},

	methods: {
		runAnalytics(title) {
			this.$ga.event('Navigation', 'click', title)
		},
	},

}

</script>

<style scoped lang="sass">

@import '@/styles/tools.mixins.sass'

.container
	header
		min-height: 60px
		padding-bottom: 0
		position: relative
		z-index: 3

		@include phablet
			@include rem(padding-right, 15px)
			min-height: 120px

		.item
			@include abs-pos(40px, 30px, auto, auto)
			@include transform(1px, 0)
			@include transition(all 1s)
			overflow: hidden
			padding: 0
			pointer-events: all
			z-index: 1501

			@include phablet
				display: none

			i
				font-weight: 900

				&.on
					color: $anchor-text-hover

			em
				font-family: $font-stack-serif

				&.active
					color: $anchor-text-hover

		.menu
			@include abs-pos(0, auto, auto, 0)
			@include rem(padding, 50px 30px 40px)
			@include size(100%, 100%)
			background: $background-alt
			pointer-events: all
			position: fixed
			text-align: center
			z-index: 1500

			@include phablet
				@include rel-pos(auto, auto, auto, auto)
				@include rem(margin, 0 50px)
				@include rem(padding, 0)
				background: transparent
				width: 80%
				z-index: inherit


			&.hide-content
				@include phablet
					display: inline-block !important

			a
				@mixin bold()
				@include rem(margin, 30px 0 0)
				@include rem(padding, 0 10px 5px)
				color: $text
				cursor: pointer
				display: inline-block
				font: normal 1.6em/1.6 $font-stack-serif
				letter-spacing: .5px
				text-align: left
				text-decoration: none

				@include phablet
					@include rem(margin, 0 15px 10px)
					@include rem(padding-bottom, 5px)
					text-align: right

				&:first-child
					@include phablet
						margin-left: 0
						padding-left: 0

				&.active,
				&.router-link-exact-active
					.icon
						@include animation(blink 2s steps(5, start) infinite)
						color: $anchor-text-hover2

				&:hover,
				&.active,
				&.router-link-exact-active
					color: $anchor-text-hover2

					.icon
						color: $anchor-text-hover2
						visibility: visible

				.icon
					@include black()
					@include transition(visibility 1s ease-out)
					font-size: .75em
					margin-right: 0
					visibility: hidden

</style>
