<template>
	<div class="ui accordion">
		<div class="active title">
			<div class="ui icon message">
				<i class="heartbeat icon"></i>
				<div class="content">
					<div class="header">{{content.about.subtitle}}</div>
				</div>
			</div>
		</div>
		<div class="active content">
			<p v-html="content.about.copy"></p>
		</div>
		<div class="title">
			<div class="ui icon message">
				<i class="desktop icon"></i>
				<div class="content">
					<div class="header">{{content.about.subtitle2}}</div>
				</div>
			</div>
		</div>
		<div class="content">
			<p v-html="content.about.copy2"></p>
		</div>
		<div class="title">
			<div class="ui icon message">
				<i class="diamond icon"></i>
				<div class="content">
					<div class="header">{{content.about.subtitle3}}</div>
				</div>
			</div>
		</div>
		<div class="content">
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
		},
		mounted() {
			$('.ui.accordion').accordion()
		}
	}

</script>

<style scoped lang="sass">

	.ui.accordion .title:not(.ui),
	.ui.accordion .accordion .title:not(.ui)
		@include rem(margin-bottom, 15px)
		@include rem(padding, 0 0 15px)
		box-shadow: $background-c 0px -1px 0px 0px inset

		.ui.message
			font-size: 1.5rem
			margin: 0
			padding: 0

			@include phablet
				font-size: 2.25rem

			.header:not(.ui)
				margin-bottom: 0
				text-shadow: $background 0px 0px 15px

		&:hover,
		&.active
			.ui.message
				.header:not(.ui)
					text-shadow: rgb(1, 142, 66) 0px 0px 15px

	body.light
		.ui.accordion .title:not(.ui),
		.ui.accordion .accordion .title:not(.ui)
			box-shadow: rgba(0, 0, 0, 0.3) 0px -1px 0px 0px inset

			.ui.message
				.header:not(.ui)
					text-shadow: none

</style>
