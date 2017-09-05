<template>
	<div class="copy">
		<h1>{{content.common.global.prefix}}{{content.common.global.name}}</h1>
		<p><em>{{content.common.global.copy}}</em></p>
		<h2>{{content.common.global.copy2}}</h2>
	</div>
</template>

<script>

	export default {
		data: function () {
			return {
				content: require('../json/static.en-us.json')
			}
		}
	}

</script>

<style lang="sass">

	@import '../styles/main.sass'

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
				color: $anchor-text-hover
				font-size: 180%
				margin: 0
				overflow: hidden
				text-shadow: $text-shadow-hover
				white-space: nowrap
				width: 100%

			p
				margin-bottom: 0

</style>