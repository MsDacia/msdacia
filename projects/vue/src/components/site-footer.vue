<template>
	<footer>
		<div class="ui one column centered grid">
			<div class="nine column centered row">
				<email-link :local-part="content.common.email.local" :domain="content.common.email.domain" :subject="content.common.email.subject"></email-link>
				<a
					:href="content.common.social.linkedin.url"
					target="_blank"
					:title="content.common.social.linkedin.title">
					<i :class="content.common.social.linkedin.icon"></i>
				</a>
				<a
					:href="content.common.social.facebook.url"
					target="_blank"
					:title="content.common.social.facebook.title">
					<i :class="content.common.social.facebook.icon"></i>
				</a>
				<a
					:href="content.common.social.twitter.url"
					target="_blank"
					:title="content.common.social.twitter.title">
					<i :class="content.common.social.twitter.icon"></i>
				</a>
				<a
					:href="content.common.social.instagram.url"
					target="_blank"
					:title="content.common.social.instagram.title">
					<i :class="content.common.social.instagram.icon"></i>
				</a>
				<a
					:href="content.common.social.github.url"
					target="_blank"
					:title="content.common.social.github.title">
					<i :class="content.common.social.github.icon"></i>
				</a>
				<a
					:href="content.common.social.jsfiddle.url"
					target="_blank"
					:title="content.common.social.jsfiddle.title">
					<i :class="content.common.social.jsfiddle.icon"></i>
				</a>
				<a
					:href="content.common.social.skype.url"
					target="_blank"
					:title="content.common.social.skype.title">
					<i :class="content.common.social.skype.icon"></i>
				</a>
				<a
					:href="content.common.social.yelp.url"
					target="_blank"
					:title="content.common.social.yelp.title">
					<i :class="content.common.social.yelp.icon"></i>
				</a>
			</div>
		</div>
		
		<p class="copyright">
			<i :class="content.common.copyright.icon"></i>
			{{content.common.copyright.content}}
		</p>
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
		text-align: center

		.ui.centered.grid > .row
			@include rem(padding, 0 5px)

		a
			@include rem(margin-bottom, 5px)
			@include size(54px, 54px)
			text-align: center

			@include phablet
				width: 64px

			i,
			.svg-inline--fa
				font-size: 36px
				margin-right: 0

				@include phablet
					font-size: 48px

		p
			font-size: $base-font-size

			&.copyright
				font-size: 11px

				@include phablet
					@include rem(margin-top, 10px)

				i,
				.svg-inline--fa
					font-size: 11px

</style>
