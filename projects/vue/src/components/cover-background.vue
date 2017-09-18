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
		@include size(100%, auto)
		min-height: 100%

		main,
		footer,
		header
			@include rem(margin-bottom, 15px)
			@include rem(padding, 10px 15px 15px)
			margin: 0 auto
			max-width: 1440px
			position: relative
			width: 100%
			z-index: 2

		main,
		footer
			margin-bottom: 0

		main
			height: 75%
			min-height: 420px

			@include phablet
				@include rem(padding-left, 35px)
				@include rem(padding-right, 35px)
				min-height: 600px

		footer
			@include rem(margin-top, 40px)

</style>
