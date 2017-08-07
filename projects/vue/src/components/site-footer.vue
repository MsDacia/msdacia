<template>
	<b-navbar id="footer" type="dark" variant="default">
		<div class="row">
			<div class="col-sm-4">
				<h4><i class="fal fa-envelope"></i> email</h4>
				<p><email-link local-part="davidanddacia" domain="gmail.com" subject="Wedding Site Contact Us"></email-link></p>
			</div>
			<div class="col-sm-4">
				<h2 @click="open"><span>Ms</span> Dacia</h2>
				<p class="copyright">&copy; 2004 - 2018 website designed, developed by MsDacia</p>
			</div>
			<div class="col-sm-4">
				
			</div>
		</div>
	</b-navbar>
</template>

<script>

	import EmailLink from '../components/email-link.vue'

	export default {
		components: {
			EmailLink
		},
		computed: {
			href: function () {
				let uri = `/home`

				return uri
			}
		},
		methods: {
			open() {
				window.open( this.href, '_self' ).scrollTo( 0, 0 )
			}
		}
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

	#footer
		@include rem(margin-top, 20px)
		background: linear-gradient(transparent, $background3)
		text-align: center
		z-index: 3

		.col-sm-4
			&:first-of-type,
			&:last-of-type
				@include rem(margin-top, 20px)
				@include rem(padding-top, 20px)

				h4
					@include rem(margin-bottom, 2.5px)
					font-size: 21.6px

					i,
					.svg-inline--fa
						font-size: 18px

				p
					a
						color: $text7

				i,
				.svg-inline--fa
					@include rem(margin-right, 0)

				b
					font-family: $font-stack-sans-serif2
					font-size: 17.5px

			&:last-of-type
				h4
					color: $text8

				p
					@include rem(padding, 0 65px)

					@include tablet-large
						@include rem(padding, 0 25px)

		h2
			color: $text
			cursor: pointer
			font: 700 64px/1 $font-stack-sans-serif2
			text-shadow: $text-shadow
			text-transform: uppercase

			@include tablet
				font-size: 54px

			span
				font-size: 32px

				&:last-of-type
					font-size: 42px

		p
			font-size: $base-font-size

			&.copyright
				@include rem(margin-top, 10px)
				font-size: 11px

</style>
