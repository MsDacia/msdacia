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

			<div class="ui list">
				<div class="item" v-for="link in content.projects.list" :key="link.id">
					<div class="content">
						<a :href="link.url">
							<i :class="link.icon"></i>{{link.title}}
						</a>
					</div>
				</div>
			</div>

			<div class="ui statistics">
				<div class="ui mini inverted statistic" :class="content.common.colors[Math.round(Math.random()*(content.common.colors.length-1))]" v-for="tag of sortedTags" :key="tag">
					<div class="value">{{ tagMap.get(tag) }}</div>
					<div class="label">{{ tag }}</div>
				</div>
			</div>

			<div class="timeline">
				<div class="item" :data-text="project.title" v-for="project in content.projects.project" :key="project.id">
					<div class="ui segment">
						<h2 class="title" v-html="project.year"></h2>
						<a :href="project.link" target="_blank" class="ui medium image">
							<img :src="getImage(project)" />
							<div class="ui green right ribbon label">{{project.timeline}}</div>
							<div class="ui bottom attached label">{{project.client}}</div>
						</a>

						<div class="ui labels">
							<a class="ui label" v-for="tag in project.tags" :key="tag.id">
								{{tag}}
							</a>
						</div>
					</div>
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
		computed: {
			tagMap: function () {
				const map = new Map()
				for (const project of this.content.projects.project) {
					for (const tag of project.tags) {
						if (!map.has(tag)) {
							map.set(tag, 1)
						} else {
							const count = map.get(tag)
							map.set(tag, count + 1)
						}
					}
				}
				return map
			},
			sortedTags: function () {
				return Array.from(this.tagMap.keys()).sort()
			}
		},
		methods: {
			getImage(project) {
				return require('../assets/images/projects/' + project.image)
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

	.ui.statistics
		> .statistic
			min-height: 100px
			min-width: 100px
			max-width: 100px
			text-align: center

	.timeline
		max-width: 700px

		.item
			@include rem(margin-bottom, 20px)

		.ui[class*="bottom attached"].label
			background-color: $background-alt-b
			color: $text

		.ui.labels
			@include rem(margin-top, 10px)

			@include tablet-small
				float: right
				margin-top: 0
				width: 50%

		.ui.segment
			.ui.image
				max-height: 150px
				max-width: 260px
				overflow: hidden
				width: 220px

				@include mobile-xsmall
					width: 260px

				img
					@include transition(all 1s ease-in)
					-webkit-filter: grayscale(100%)
					filter: grayscale(100%)

				&:hover
					img
						-webkit-filter: grayscale(0%)
						filter: grayscale(0%)

</style>
