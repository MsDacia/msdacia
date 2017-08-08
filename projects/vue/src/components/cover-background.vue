<template>
	<div class="video-container">
		<site-header></site-header>
		<div class="filter"></div>
		<video autoplay loop class="fillWidth">
			<source src="../assets/videos/After-Party/Mp4/After-Party.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
			<source src="../assets/videos/After-Party/WEBM/After-Party.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
		</video>
		<div class="poster hidden">
			<img src="../assets/videos/After-Party/Snapshots/After-Party.jpg" alt="After Party">
		</div>
		<main>
			<slot></slot>
		</main>
		<site-footer></site-footer>
	</div>
</template>

<script>

	import SiteFooter from '../components/site-footer.vue'
	import SiteHeader from '../components/site-header.vue'
	import ScrollToBottom from '../components/scroll-to-bottom.vue'
	import ScrollToTop from '../components/scroll-to-top.vue'
	

	export default {

		components: {
			SiteFooter,
			SiteHeader,
			ScrollToBottom,
			ScrollToTop
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
		background: #000
		background-size: cover
		overflow: hidden
		position: absolute

		iframe,
		video,
		.poster
			@include abs-pos(0, 0, 0, 0)
			@include size(120%, 120%)
			position: fixed
			transform: translate(-8%, 0%)
			z-index: 1

		.poster
			pointer-events: none
			position: absolute
			z-index: 0

		main
			@include rem(padding, 30px 70px)
			position: relative
			z-index: 3

			form
				@include rem(padding, 20px)
				background: $background3b

</style>
