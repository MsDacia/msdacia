<template>
	<div class="timeline">
		<div class="ui grid">
			<div class="five wide column" :data-text="project.title" v-for="(project, index) in projects" :key="project.id">
				<div class="item">
					<div class="ui segment">
						<div class="ui massive label" v-if="index === 0 || projects[index - 1].year !== project.year">{{project.year}}</div>
						<a class="ui small image project">
							<img :src="getImage(project)" :alt="project.name" />
							<div class="ui green right ribbon label">{{project.timeline}}</div>
							<div class="ui bottom attached label">{{project.name}}</div>
						</a>

						<div class="ui basic modal" :id="project.id">
							<div class="actions">
								<div class="ui red basic cancel inverted button">
									<i class="remove icon"></i>
									Close
								</div>
							</div>
							<div class="ui header">
								<div class="ui massive label">{{project.year}}</div>
							</div>
							<div class="content">
								<a :href="project.link" target="_blank" class="ui small image">
									<img :src="getImage(project)" :alt="project.name" />
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
		},
		mounted() {
			$('.ui.basic.modal').modal('attach events', '.ui.image.project', 'show')
		}
	}

</script>

<style scoped lang="sass">

	.ui.modal,
	.timeline
		.item
			@include rem(margin-bottom, 20px)
			min-height: 180px

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
				@include rem(padding-bottom, 8px)
				@include rem(padding-top, 8px)
				background-color: $background-alt-a
				color: $text
				cursor: default


		.ui.header,
		.ui.segment
			@include rem(padding, 10px 10px 10px 30px)
			position: relative

			.ui.massive.label,
			.ui.massive.labels .label
				@include abs-pos(69px, auto, auto, -50px)
				background: transparent
				color: $text
				font-size: 300%
				margin: 0
				opacity: .6
				padding: 0
				transform: rotate(90deg)

			.ui.image
				max-height: 130px
				max-width: 260px
				overflow: hidden
				width: 260px

				img
					@include transition(all 1s ease-in)
					-webkit-filter: grayscale(100%)
					filter: grayscale(100%)

				&:hover
					img
						-webkit-filter: grayscale(0%)
						filter: grayscale(0%)

		.ui.modal
			> .content
				@include rem(margin-left, 100px)
				@include rem(margin-top, -30px)

				.ui.small.image,
				.ui.small.images .image,
				.ui.small.images img,
				.ui.small.images svg
					max-width: 80%
					width: 80%

				.ui.labels
					@include rem(margin-top, 20px)
					float: none
					width: 100%

					.ui.label,
					.label
						font-size: 1.75em

		.ui.header
			.ui.massive.label,
			.ui.massive.labels .label
				font-size: 7em
				left: -100px


</style>