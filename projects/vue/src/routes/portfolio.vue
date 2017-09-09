<template>
	<div class="ui grid">
		<div class="two wide column">
			<div class="block">
				<h1>{{content.projects.title}}</h1>
			</div>
		</div>
		<div class="fourteen wide column">	
			<p v-html="content.projects.copy"></p>

			<h2>{{content.projects.subtitle}}</h2>
			<project-list></project-list>

			<h2>{{content.projects.subtitle2}}</h2>
			<project-stats></project-stats>

			<h2>{{content.projects.subtitle3}}</h2>
			<project-timeline></project-timeline>
			
		</div>
	</div>
</template>

<script>

	import ProjectList from '../components/project-list.vue'
	import ProjectStats from '../components/project-stats.vue'
	import ProjectTimeline from '../components/project-timeline.vue'

	export default {
		components: {
			ProjectList,
			ProjectStats,
			ProjectTimeline
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

	p:first-of-type
		max-width: 900px

	h1
		left: -98px
		top: 145px

</style>
