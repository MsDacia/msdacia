<template>
	<div class="ui grid">
		<div class="two wide column">
			<div class="block">
				<h1>{{content.resume.title}}</h1>
			</div>
		</div>
		<div class="fourteen wide column">
			<ad-work></ad-work>
			<address>{{content.resume.address}}</address>
			<p>
				<a :href="content.resume.resumeUrl" target="_blank" @click="runAnalytics('download resume')">
					<i class="inverted file pdf outline icon"></i>
					{{content.resume.resumeTitle}}
				</a>
			</p>

			<h2 class="ui horizontal divider header">
				<i class="keyboard icon"></i>
				{{content.resume.skills.title}}
			</h2>
			<div class="ui attached segment">
				<skills></skills>
			</div>

			<h2 class="ui horizontal divider header">
				<i class="id badge icon"></i>
				{{content.resume.objective.title}}
			</h2>
			<div class="ui attached segment">
				<objective></objective>
			</div>

			<h2 class="ui horizontal divider header">
				<i class="desktop icon"></i>
				{{content.resume.experiences.title}}
			</h2>
			<div class="ui attached segment">
				<experience></experience>
			</div>

			<h2 class="ui horizontal divider header">
				<i class="university icon"></i>
				{{content.resume.education.title}}
			</h2>

			<div class="ui attached segment">
				<education></education>
			</div>
		</div>
	</div>
</template>

<script>

import AdWork from '../components/ad-work.vue'
import Skills from '../components/skills.vue'
import Links from '../components/links.vue'
import Objective from '../components/objective.vue'
import Experience from '../components/experience.vue'
import Education from '../components/education.vue'

export default {
	components: {
		AdWork,
		Skills,
		Links,
		Objective,
		Experience,
		Education,
	},
	data() {
		return {
			content: require('../json/static.en-us.json'),
		}
	},
	mounted() {
		this.$ga.page(this.$router)
	},
	methods: {
		runAnalytics(title) {
			this.$ga.event('Resume', 'click', title)
		},
	},
}

</script>

<style scoped lang="sass">

@import '@/styles/variables.sass'

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
