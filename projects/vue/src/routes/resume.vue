<template>
	<div class="ui grid">
		<div class="two wide column">
			<div class="block">
				<h1>{{content.resume.title}}</h1>
			</div>
		</div>
		<div class="fourteen wide column">
			<address>{{content.resume.address}}</address>
			<p><a :href="content.resume.resumeUrl" target="_blank" class="has-icon">
				<i class="inverted file pdf outline icon"></i>
				{{content.resume.resumeTitle}}
			</a></p>
			<h2 class="ui top attached header">{{content.resume.skills.title}}</h2>
			<div class="ui attached segment">
				<skills></skills>
			</div>
			<h2 class="ui attached header">{{content.resume.links.title}}</h2>
			<div class="ui attached segment">
				<links></links>
			</div>
			<h2 class="ui attached header">{{content.resume.objective.title}}</h2>
			<div class="ui attached segment">
				<objective></objective>
			</div>
			<h2 class="ui attached header">{{content.resume.experiences.title}}</h2>
			<div class="ui attached segment">
				<experience></experience>
			</div>
			<h2 class="ui attached header">{{content.resume.education.title}}</h2>
			<div class="ui attached segment">
				<education></education>
			</div>
		</div>
	</div>
</template>

<script>

	import Skills from '../components/skills.vue'
	import Links from '../components/links.vue'
	import Objective from '../components/objective.vue'
	import Experience from '../components/experience.vue'
	import Education from '../components/education.vue'

	export default {
		components: {
			Skills,
			Links,
			Objective,
			Experience,
			Education
		},
		data: function () {
			return {
				content: require('../json/static.en-us.json')
			}
		}
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

	h1
		left: -86px
		top: 145px

	address ~ p
		a
			color: $text

			&:hover,
			&.active
				color: $anchor-text-hover

</style>
