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
	data() {
		return {
			content: require('../json/static.en-us.json'),
		}
	},
}

</script>

<style scoped lang="sass">

	.ui.card
		.content
			padding-top: 0

</style>
