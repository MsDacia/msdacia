<template v-repeats="content">
	<div class="wrapper">
		{{content.common.global.title}}
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
		data: function () {
			return {
				content: null
			}
		},
		methods: {
			getContent: function() {
				this.$http.get('../json/static.en-us.json').then(function(response) {
					console.log(response.data)
					this.content = response.data
				}, function(error){
					console.log(error.statusText)
				})
			}
		},
		mounted: function () {
			this.getContent()
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
