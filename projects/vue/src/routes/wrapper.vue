<template>
	<div class="wrapper">
		<cover-background>
			<router-view class="main-content"></router-view>
		</cover-background>
	</div>
</template>

<script>

	import CoverBackground from '../components/cover-background.vue'

	export default {

		components: {
			CoverBackground
		},
		data: {
			json: null
		},
		created: function () {
			fetch('/json/static.en-us.json')
				.then(r => r.json())
				.then(json => {
					this.json = json
			})
		}
	}

</script>

<style lang="sass">

	@import '../styles/main.sass'

	.main-content
		margin: 0 auto
		max-width: 1024px

		@include tablet-large
			max-width: $tablet

		@include desktop-large
			max-width: $desktop

		@include desktop-xlarge
			max-width: $desktop-large

</style>
