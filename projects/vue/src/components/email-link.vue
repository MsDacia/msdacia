<template>
	<a class="email-icon" :title="title" :href="href" @click.prevent="open" v-html="obfuscatedText"></a>
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
			href: function () {
				let uri = `mailto:${this.localPart}@${this.domain}`

				if (this.subject) {
					uri += `?subject=${encodeURIComponent(this.subject)}`
				}

				return uri
			},
			title: function() {
				let ref = `Email`
				return ref
			},
			obfuscatedText: function () {
				return '<i class="mail icon" style="font-size: 2.6em;"></i>'
			}
		},
		methods: {
			open() {
				window.open(this.href, '_self')
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
			@include size(64px, 64px)
			box-shadow: 0 0 1px transparent
			color: $text
			overflow: hidden
			padding-bottom: 3px
			text-align: center

			&:hover
				color: $anchor-text-hover2
				cursor: pointer

				i.icon
					color: $anchor-text-hover2


			i.icon
				font-size: 2.6em
				margin-right: 0

				&:hover
					color: $anchor-text-hover2

</style>
