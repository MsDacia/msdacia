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

<style scoped lang="sass">

	main
		grid-area: main
		overflow-y: auto
		position: relative

	header
		grid-area: header

	footer
		grid-area: footer

	.container
		@include rem(margin, 0)
		@include rem(padding, 0)
		@include size(100vw, 100vh)
		display: grid;
		grid-gap: 1em;
		grid-template-areas: "header" "main" "footer"
		grid-template-rows: 50px auto 80px
		overflow: hidden
		position: relative

		main,
		header,
		footer
			@include rem(margin-bottom, 15px)
			@include rem(padding, 0 20px)
			margin: 0 auto
			max-width: 1440px
			position: relative
			width: 100vw
			z-index: 2
</style>
