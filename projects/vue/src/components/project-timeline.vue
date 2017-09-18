<template>
	<div class="timeline">
		<div class="item" :data-text="project.title" v-for="(project, index) in projects" :key="project.id">
			<div class="ui segment">
				<div class="ui massive label" v-if="index === 0 || projects[index - 1].year !== project.year">{{project.year}}</div>
				<a :href="project.link" target="_blank" class="ui medium image">
					<img :src="getImage(project)" />
					<div class="ui green right ribbon label">{{project.timeline}}</div>
					<div class="ui bottom attached label">{{project.name}}</div>
				</a>

				<div class="ui labels">
					<a class="ui label" v-for="tag in project.tags" :key="tag.id">
						{{tag}}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		props: {
			projects: Array
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

			.ui.label
				cursor: default

		.ui.segment
			position: relative

			.ui.massive.label,
			.ui.massive.labels .label
				@include abs-pos(30px, auto, auto, -90px)
				background: transparent
				color: $text
				font-size: 400%
				margin: 0
				padding: 0
				transform: rotate(-90deg)

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