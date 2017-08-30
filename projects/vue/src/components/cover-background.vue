<template>
	<div class="container">
		<site-header></site-header>
		<!-- <div class="filter"></div>
		<video autoplay loop class="fillWidth">
			<source src="../assets/videos/Ideas/Mp4/Ideas.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
			<source src="../assets/videos/Ideas/WEBM/Ideas.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
		</video>
		<div class="poster hidden">
			<img src="../assets/videos/Ideas/Snapshots/Ideas.jpg" alt="Ideas">
		</div> -->
		<main>
			<div class="ui two column centered grid">
				<div class="column"></div>
				<div class="four column centered row">
					<slot></slot>
				</div>
			</div>
		</main>
		<site-footer></site-footer>
	</div>
</template>

<script>

	import SiteFooter from '../components/site-footer.vue'
	import SiteHeader from '../components/site-header.vue'

	export default {

		components: {
			SiteFooter,
			SiteHeader
		},
		props: {
			'src': { type: String }
		}

}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

	.container
		@include size(100%, auto)
		background: $background3
		background-image: linear-gradient(to top, $background3 0%, $background4 100%);
		background-size: cover
		overflow: hidden
		position: absolute

		@include phablet
			min-height: 480px

		main,
		footer,
		header
			@include rem(margin-bottom, 15px)
			@include rem(padding, 10px 15px 15px)
			position: relative
			width: 100%

		main
			margin-bottom: 0

			.main-content
				margin: 0 auto
				max-width: 1440px
				min-height: 220px

				@include phablet
					min-height: 320px

</style>
