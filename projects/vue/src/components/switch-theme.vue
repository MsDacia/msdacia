<template>
	<i class="eyedropper icon" @click="colorsInverted"></i>
</template>

<script>

export default {
	data() {
		return {
			invertColors: false,
		}
	},
	methods: {
		colorsInverted() {
			const bodyTag = document.getElementsByTagName('body')[0]
			this.$ga.event('Theme', 'click', 'theme switch')
			this.invertColors = !this.invertColors

			if (this.invertColors) {
				if (bodyTag.classList) {
					bodyTag.classList.add('light')
				} else {
					bodyTag.className += ' light'
				}
			} else {
				if (bodyTag.classList) {
					bodyTag.classList.remove('light')
				} else {
					bodyTag.className = bodyTag.className
						.replace(new RegExp('(^|\\b)' + 'light'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
				}
			}
		},
	},
}

</script>

<style scoped lang="sass">

@import '@/styles/tools.mixins.sass'

.container
	header
		.eyedropper
			@include abs-pos(5px, 0, 0, 10px)
			@include rem(font-size, 15px)
			font-weight: 300

			@include phablet
				@include rem(right, 10px)
				left: auto

			&:hover
				color: $anchor-text-hover2
				cursor: pointer

</style>
