<template>
	<footer>
		<div id="social-media">
			<email-link :local-part="content.common.email.local" :domain="content.common.email.domain" :subject="content.common.email.subject"></email-link>
			<a
				v-for="social in content.common.social"
				:key="social.id"
				:href="social.url"
				:title="social.title"
				target="_blank"
				@click="runAnalytics(social.title)"
			>
				<i :class="social.icon"></i>
			</a>
		</div>

		<p id="copyright">
			<i :class="content.common.copyright.icon"></i>
			{{content.common.copyright.content}} <a :href="content.common.global.url" @click="runAnalytics( content.common.global.title)">{{content.common.global.title}}</a>
		</p>
	</footer>
</template>

<script>

import EmailLink from '../components/email-link.vue'

export default {
	components: {
		EmailLink,
	},
	data() {
		return {
			content: require('../json/static.en-us.json'),
		}
	},
	computed: {
		href() {
			const uri = `/home`

			return uri
		},
	},
	methods: {
		open() {
			window.open( this.href, '_self' ).scrollTo( 0, 0 )
		},
		runAnalytics(title) {
			this.$ga.event('Footer', 'click', title)
		},
	},
}

</script>

<style scoped lang="sass">

@import '@/styles/tools.mixins.sass'

footer
	@include rem(margin, 40px auto 0)
	@include rem(padding, 10px 15px 15px)
	max-width: 980px
	position: relative
	text-align: center
	width: 100%
	z-index: 2

	#social-media
		align-content: center
		display: flex
		display: grid
		flex-wrap: wrap
		grid-template-columns: repeat(auto-fill,minmax(60px, 1fr))
		grid-gap: 20px
		justify-content: center

	a
		@include rem(margin-bottom, 5px)
		color: $text
		text-align: center
		text-decoration: none

		&:hover
			color: $anchor-text-hover2
			cursor: pointer

			i,
			.icon,
			.svg-inline--fa
				color: $anchor-text-hover2

		i,
		.icon,
		.svg-inline--fa
			font-size: 2.8em
			margin-right: 0

			&:hover
				color: $anchor-text-hover2

	p
		font-size: ($base-font-size - 2px)

		&#copyright
			@include phablet
				@include rem(margin-top, 10px)

			a
				color: $text5
				text-decoration: underline

				&:hover
					color: $text2

			i,
			.icon,
			.svg-inline--fa
				font-size: 1.1em

</style>
