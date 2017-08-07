<template>
	<a href="index.php" title="MsDacia" class="home-link"><i class="fa fa-home"></i></a>
</template>

<script>

	export default {
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

	.card
		min-height: 203px

		.card-block
			> a
				@include rem(margin-bottom, 10px)

			.card-title
				line-height: 1.4
				margin-bottom: 0

			p:first-of-type
				min-height: 72px

			.card-text
				em
					@include bold()
					color: $text8
					font-size: 18px

</style>
