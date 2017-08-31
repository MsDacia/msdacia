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
		font-size: 400%

		@include mobile-xsmall
			font-size: 500%

		@include phablet
			font-size: 600%

	h2
		@include animation(type 4s steps(60, end))
		font-size: 250%
		font-style: italic
		margin: 0
		overflow: hidden
		white-space: nowrap
		width: 100%

	p
		margin-bottom: 0

</style>