<template>
	<div class="ui card">
		<div class="ui horizontal list">
			<div class="item" v-for="link in content.resume.links.categories" :key="link.id">
				<div class="content">
					<a :href="link.url" self="_blank" @click="runAnalytics(link.title)">{{link.title}}</a>
				</div>
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
		},
		methods: {
			runAnalytics(title) {
				this.$ga.event('Resume Links', 'click', title)
			}
		}
	}

</script>