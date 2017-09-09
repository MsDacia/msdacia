<template>
	<div class="container" :style="computedStyle">
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
		},
		props: {
			'background-x': { type: String, default: '50%' },
			'background-y': { type: String, default: '0%' },
			'speed': { type: Number, default: 0.7 }
		},
		data: function () {
			return {
				offset: 0
			}
		},
		computed: {
			computedStyle: function () {
				return {
					backgroundPosition: `${this.backgroundX} calc(${this.backgroundY} + ${this.offset}px)`
				}
			}
		},
		methods: {
			onScroll() {
				this.offset = window.pageYOffset * this.speed
			}
		},
		mounted() {
			window.addEventListener('scroll', throttle(this.onScroll, 10))
		},
		destroy() {
			window.removeEventListener('scroll', this.onScroll)
		}
	}

	function debounce(fn, delay) {
		let timer = null

		return function() {
			const context = this
			const args = arguments

			clearTimeout(timer)
			timer = setTimeout(function() {
				fn.apply(context, args)
			}, delay)
		}
	}

	function throttle(fn, delay) {
		let lastCalled = 0

		return function() {
			const context = this
			const args = arguments

			if ((Date.now() - lastCalled) >= delay) {
				fn.apply(context, args)
				lastCalled = Date.now()
			}
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
