<template>
	<div id="footer">
		<ul>
			<li>
				<email-link :local-part="content.common.footer.email.local" :domain="content.common.footer.email.domain" :subject="content.common.footer.email.subject"></email-link>
			</li>
			<li>
				<a
					:href="content.common.footer.facebook.url"
					target="_blank"
					:title="content.common.footer.facebook.title">
					<i :class="content.common.footer.facebook.icon"></i>
				</a>
			</li>
			<li>
				<a
					:href="content.common.footer.linkedin.url"
					target="_blank"
					:title="content.common.footer.linkedin.title">
					<i :class="content.common.footer.linkedin.icon"></i>
				</a>
			</li>
			<li>
				<a
					:href="content.common.footer.twitter.url"
					target="_blank"
					:title="content.common.footer.twitter.title">
					<i :class="content.common.footer.twitter.icon"></i>
				</a>
			</li>
			<li>
				<a
					:href="content.common.footer.instagram.url"
					target="_blank"
					:title="content.common.footer.instagram.title">
					<i :class="content.common.footer.instagram.icon"></i>
				</a>
			</li>
			<li>
				<a
					:href="content.common.footer.github.url"
					target="_blank"
					:title="content.common.footer.github.title">
					<i :class="content.common.footer.github.icon"></i>
				</a>
			</li>
			<li>
				<a
					:href="content.common.footer.jsfiddle.url"
					target="_blank"
					:title="content.common.footer.jsfiddle.title">
					<i :class="content.common.footer.jsfiddle.icon"></i>
				</a>
			</li>
			<li>
				<a
					:href="content.common.footer.skype.url"
					target="_blank"
					:title="content.common.footer.skype.title">
					<i :class="content.common.footer.skype.icon"></i>
				</a>
			</li>
			<li>
				<a
					:href="content.common.footer.yelp.url"
					target="_blank"
					:title="content.common.footer.yelp.title">
					<i :class="content.common.footer.yelp.icon"></i>
				</a>
			</li>
		</ul>

		<h2 @click="open">{{content.common.global.title}}</h2>
		<p class="copyright">
			<i :class="content.common.copyright.icon"></i>
			{{content.common.copyright.content}}
		</p>
	</div>
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

	#footer
		@include rem(margin-top, 20px)
		@include rem(padding-top, 20px)
		background: linear-gradient($background3, transparent)
		pointer-events: none
		position: relative
		text-align: center
		width: 100%
		z-index: 3

		ul
			li
				display: inline-block

				i,
				.svg-inline--fa
					font-size: 45px

		h2
			color: $text
			cursor: pointer
			font: 700 64px/1 $font-stack-sans-serif2
			text-align: center
			text-shadow: $text-shadow

			@include tablet
				font-size: 54px

			span
				font-size: 32px

				&:last-of-type
					font-size: 42px

		p
			font-size: $base-font-size
			text-align: center

			&.copyright
				@include rem(margin-top, 10px)
				font-size: 11px
				text-align: center

				i,
				.svg-inline--fa
					font-size: 11px

</style>
