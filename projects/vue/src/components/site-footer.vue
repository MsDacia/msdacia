<template>
	<footer>
		<div class="row">
			<div class="col-xs-4"></div>
			<div class="col-xs-7">
				<ul>
					<li>
						<email-link :local-part="content.common.email.local" :domain="content.common.email.domain" :subject="content.common.email.subject"></email-link>
					</li>
					<li v-for="footerNav in content.common.footer" :key="footerNav.id">
						<a
							:href="footerNav.url"
							target="_blank"
							:title="footerNav.title">
							<i :class="footerNav.icon"></i>
						</a>
					</li>
				</ul>
				<h2 @click="open">{{content.common.global.title}}</h2>
				<p class="copyright">
					<i :class="content.common.copyright.icon"></i>
					{{content.common.copyright.content}}
				</p>
			</div>
			<div class="col-xs-1"></div>
		</div>
	</footer>
</template>

<script>

	import EmailLink from '../components/email-link.vue'

	export default {
		components: {
			EmailLink
		},
		data: function () {
			return {
				content: require('../json/static.en-us.json')
			}
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

	footer
		@include rem(margin-top, 20px)
		@include rem(padding, 20px 0 0 20px)
		position: relative
		width: 100%
		z-index: 3

		ul
			@include rem(padding-left, 0)

			li
				display: inline-block
				text-align: center

				a
					@include size(58px, 58px)

					i,
					.svg-inline--fa
						font-size: 45px

		h2
			cursor: pointer
			font: 700 64px/1 $font-stack-sans-serif2
			text-shadow: $text-shadow

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

				i,
				.svg-inline--fa
					font-size: 11px

</style>
