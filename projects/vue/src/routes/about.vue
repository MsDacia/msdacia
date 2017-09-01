<template>
	<div class="ui grid">
		<div class="two wide column">
			<h1>{{content.about.title}}</h1>
		</div>
		<div class="fourteen wide column">
			<div class="ui accordion">
				<div class="active title">
					<h2>{{content.about.subtitle}}</h2>
				</div>
				<div class="active content">
					<p v-html="content.about.copy"></p>
				</div>
				<div class="title">
					<h2>{{content.about.subtitle2}}</h2>
				</div>
				<div class="content">
					<p v-html="content.about.copy2"></p>
				</div>
				<div class="title">
					<h2>{{content.about.subtitle3}}</h2>
				</div>
				<div class="content">
					<p v-html="content.about.copy3"></p>
					<p v-html="content.about.copy4"></p>
				</div>
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
		},
		mounted() {
			$('.ui.accordion').accordion()
		}
	}

</script>

<style lang="sass">

	@import '../styles/main.sass'

</style>
