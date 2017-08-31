<template>
	<div class="container">
		<div class="overlay"></div>
		<site-header></site-header>
		<main>
			<slot></slot>
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
		}
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

	.container
		@include size(100%, 100%)
		background: $background-alt url('../assets/images/dandelion_panel_land.jpg') 50% 50% no-repeat
		background-size: cover
		filter: invert(0%)
		overflow: hidden

		@include phablet
			min-height: 480px

		main,
		footer,
		header
			@include rem(margin-bottom, 15px)
			@include rem(padding, 10px 15px 15px)
			position: relative
			width: 100%
			z-index: 2

		main,
		footer
			margin-bottom: 0

		main
			height: 75%
			margin: 0 auto
			max-width: 1440px
			min-height: 220px

			@include phablet
				min-height: 320px

</style>
