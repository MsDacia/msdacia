<template>
	<a :href="href" @click.prevent="open" v-html="obfuscatedText"></a>
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
			obfuscatedText: function () {
				return '<i class="far fa-at" style="font-size: 48px;"></i>'
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

<style lang="sass" scoped>

	@import '../styles/main.sass'


</style>
