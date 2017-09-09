<template>
	<div class="ui list">
		<div class="item" v-for="link in content.projects.list" :key="link.id">
			<div class="content">
				<a :href="link.url">
					<i :class="link.icon"></i>{{link.title}}
				</a>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data: function () {
			return {
				content: require('../json/static.en-us.json')
			}
		}
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

	.ui.list .list,
	.ui.list
		@include rem(margin-bottom, 30px)

</style>