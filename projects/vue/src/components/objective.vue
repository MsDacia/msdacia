<template>
	<div class="ui card">
		<div class="content">
			<div class="description">
				<p>{{content.resume.objective.copy}}</p>
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

<style lang="sass" scoped>

	@import '../styles/main.sass'

</style>