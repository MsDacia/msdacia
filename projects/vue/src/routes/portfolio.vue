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
						<a :href="link.url" target="_blank"><i :class="link.icon"></i>{{link.title}}</a>
					</div>
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

</style>
