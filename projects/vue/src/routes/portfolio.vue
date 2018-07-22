<template>
	<div class="ui grid" v-if="!loading">
		<div class="two wide column">
			<div class="block">
				<h1>{{content.portfolio.title}}</h1>
			</div>
		</div>
		<div class="fourteen wide column">
			<ad-work></ad-work>
			<p v-html="content.portfolio.copy"></p>

			<div class="ui grid">
				<div class="two wide column">
					<h2>{{content.portfolio.subtitle2}}</h2>
					<project-stats @tag-selected="onTagSelected"></project-stats>
				</div>
				<div id="timeline" class="fourteen wide column">
					<h2>{{content.portfolio.subtitle3}}</h2>
					<project-timeline :projects="filteredProjects"></project-timeline>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase/app'
import { db, contentRef } from '@/datastore'

import AdWork from '../components/ad-work.vue'
import ProjectStats from '../components/project-stats.vue'
import ProjectTimeline from '../components/project-timeline.vue'

export default {
	components: {
		AdWork,
		ProjectStats,
		ProjectTimeline,
	},

	computed: {
		filteredProjects() {
			let projects = this.content.portfolio.projects

			if (this.tag) {
				projects = projects.filter((project) => project.tags.includes(this.tag))
			}

			return projects.sort((a, b) => b.year - a.year)
		},
	},

	data() {
		return {
			loading: true,
			tag: undefined,
		}
	},

	firebase: {
		content: {
			source: contentRef,
			asObject: true,
			readyCallback: function () { this.loading = false }
		},
	},

	mounted() {
		this.$ga.page(this.$router)
	},

	methods: {
		onTagSelected(tag) {
			this.tag = tag
		},
	},

}

</script>

<style scoped lang="sass">

	p:first-of-type
		max-width: 900px

	h1
		left: -98px
		top: 145px

</style>
