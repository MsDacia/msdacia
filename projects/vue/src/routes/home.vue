<template>
	<div class="copy" v-if="!loading">
		<h1>{{content.common.global.prefix}}{{content.common.global.name}}</h1>
		<p><em>{{content.common.global.copy}}</em></p>
		<h2>{{content.common.global.copy2}}</h2>
		<p>{{content.common.global.tagline}}</p>
	</div>
</template>

<script>

import firebase from 'firebase/app'
import { db, contentRef } from '@/datastore'

export default {

	data() {
		return {
			loading: true
		}
	},

	firebase: {
		content: {
			source: contentRef,
			asObject: true,
			readyCallback: function () { this.loading = false }
		},
	},

	mounted() {
		this.$ga.page(this.$router)
	},

}

</script>

<style scoped lang="sass">

@import '@/styles/tools.mixins.sass'

main
	display: flex
	flex-direction: column
	justify-content: center

	.copy
		text-align: right
		z-index: 3

		h1
			@include rel-pos(auto, auto, auto, auto)
			@include rem(margin-bottom, 10px)
			color: $text
			font-size: 300%
			letter-spacing: 0
			margin-left: 0
			text-shadow: $text-shadow
			transform: rotate(0deg)

			@include mobile-xsmall
				font-size: 400%

			@include phablet
				font-size: 500%

		h2
			@include animation(type 4s steps(60, end))
			color: $anchor-text
			font-size: 180%
			margin: 0
			overflow: hidden
			text-shadow: $text-shadow
			white-space: nowrap
			width: 100%

		p
			margin-bottom: 0

</style>