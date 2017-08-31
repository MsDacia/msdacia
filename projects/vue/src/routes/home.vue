<template>
	<div id="home">
		<div class="ui two column centered grid">
			<div class="six column centered row">
				<h1>{{content.common.global.prefix}}{{content.common.global.name}}</h1>
				<p><em>{{content.common.global.copy}}</em></p>
				<h2><em>{{content.common.global.copy2}}</em></h2>
			</div>
		</div>
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

	h1
		font-size: 400%

		@include mobile-xsmall
			font-size: 500%

		@include phablet
			font-size: 600%

	h2
		em
			font-style: italic

	p
		margin-bottom: 0

</style>