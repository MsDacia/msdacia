<template>
	<a :title="title" :href="href" @click.prevent="open" v-html="obfuscatedText"></a>
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
				return '<i class="far fa-at" style="font-size: 3.2em;"></i>'
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

		a
			@include rem(margin-bottom, 5px)
			@include size(54px, 54px)
			box-shadow: 0 0 1px transparent
			color: $text
			overflow: hidden
			padding-bottom: 3px
			text-align: center

			@include phablet
				width: 64px

			&:hover
				color: $anchor-text-hover2
				cursor: pointer

				i,
				.far,
				.icon,
				.svg-inline--fa
					color: $anchor-text-hover2

			i,
			.far,
			.icon,
			.svg-inline--fa
				font-size: 3.6em
				margin-right: 0

				&:hover
					color: $anchor-text-hover2

</style>
