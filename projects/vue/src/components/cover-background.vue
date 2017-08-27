<template>
	<div class="video-container">
		<site-header></site-header>
		<div class="filter"></div>
		<!-- <video autoplay loop class="fillWidth">
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

	.no-video .video-container video,
	.touch .video-container video
		display: none

	.no-video .video-container .poster,
	.touch .video-container .poster
		display: block !important

	.video-container
		@include size(100%, auto)
		background: $background-alt
		background-image: linear-gradient(to top, $background-alt 0%, $background4 100%);
		background-size: cover
		overflow: hidden
		position: absolute

		iframe,
		video,
		.poster
			@include abs-pos(0, 25%, 0, auto)
			@include size(100%, 100%)
			position: fixed
			transform: translate(-8%, 0%)
			z-index: 1

		.poster
			pointer-events: none
			position: absolute
			z-index: 0

		main,
		footer,
		header
			@include rem(margin-bottom, 15px)
			@include rem(padding, 10px 15px 15px)
			position: relative
			width: 100%
			z-index: 3

		main
			margin-bottom: 0

</style>
