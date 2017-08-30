<template>
	<div id="home">
		<div class="ui two column centered grid">
			<div class="six column centered row"
				<!-- <h1><span>{{content.common.global.prefix}}</span>{{content.common.global.name}}</h1>
				<p><em>{{content.common.global.copy}}</em></p>
				<h2>{{content.common.global.copy2}}</h2> -->
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
		font-size: 600%
		//transform: rotate(45deg)

		span
			fontt-size: 30px

</style>