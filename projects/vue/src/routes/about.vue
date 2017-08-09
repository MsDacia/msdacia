<template>
	<div>
		<h1>{{content.about.title}}</h1>
		<div class="content">
			<h2>{{content.about.subtitle}}</h2>
			<p v-html="content.about.copy"></p>

			<h2>{{content.about.subtitle2}}</h2>
			<p v-html="content.about.copy2"></p>

			<h2>{{content.about.subtitle3}}</h2>
			<p v-html="content.about.copy3"></p>
			<p v-html="content.about.copy4"></p>
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

</style>
