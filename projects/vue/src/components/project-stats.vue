<template>
	<div class="horizontal-scroll">
		<div class="ui statistics scroll">
			<div class="ui inverted statistic" v-for="tag of sortedTags" :key="tag">
				<div class="value">{{ tagMap.get(tag) }}</div>
				<div class="label">{{ tag }}</div>
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
		computed: {
			tagMap: function () {
				const map = new Map()
				for (const project of this.content.portfolio.projects) {
					for (const tag of project.tags) {
						if (!map.has(tag)) {
							map.set(tag, 1)
						} else {
							const count = map.get(tag)
							map.set(tag, count + 1)
						}
					}
				}
				return map
			},
			sortedTags: function () {
				return Array.from(this.tagMap.keys()).sort()
			}
		}
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

</style>