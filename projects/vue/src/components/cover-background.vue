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
		SiteHeader,
	},
}

</script>

<style scoped lang="sass">

@import '@/styles/tools.mixins.sass'

.container
	@include size(100%, auto)
	min-height: 100%

	main,
	header
		@include rem(margin-bottom, 15px)
		@include rem(padding, 10px 25px 15px)
		margin: 0 auto
		max-width: 1440px
		position: relative
		width: 100%
		z-index: 2

	main
		height: 75%
		margin-bottom: 0
		min-height: 420px

		@include phablet
			@include rem(padding-left, 35px)
			@include rem(padding-right, 35px)
			min-height: 600px

</style>
