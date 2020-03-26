<template>
	<a class="email-icon" :title="title" :href="href" @click.prevent="open, runAnalytics('email MsDacia')" v-html="obfuscatedText"></a>
</template>

<script>

	export default {
		props: {
			'domain': {
				required: true,
				type: String
			},
			'local-part': {
				required: true,
				type: String
			},
			'subject': String
		},
		computed: {
			href() {
				let uri = 'mailto:${this.localPart}@${this.domain}'

				if (this.subject) {
					uri += '?subject=${encodeURIComponent(this.subject)}'
				}

				return uri
			},
			title() {
				let ref = 'Email'
				return ref
			},
			obfuscatedText() {
				return '<i class="mail icon" style="font-size: 1.3em;"></i>'
			}
		},
		methods: {
			open() {
				window.open(this.href, '_self')
			},
			runAnalytics(title) {
				this.$ga.event('Email MsDacia', 'click', title)
			}
		}
	}

	function obfuscateHTML(text) {
		return text.split('').join('<span style="display:none">anti-spam</span>')
	}

</script>

<style scoped lang="sass">

	footer
		@include rem(margin-top, 20px)
		text-align: center

		a.email-icon
			@include rem(margin-bottom, 5px)
			@include size(24px, 24px)
			box-shadow: 0 0 1px transparent
			color: $text
			margin-right: 0.5rem
			overflow: hidden
			padding-bottom: 3px
			text-align: center

			&:hover
				color: $anchor-text-hover2
				cursor: pointer

				i.icon
					color: $anchor-text-hover2

			i.icon
				font-size: 1.2rem
				margin-right: 0.5rem

				&:hover
					color: $anchor-text-hover2

</style>
