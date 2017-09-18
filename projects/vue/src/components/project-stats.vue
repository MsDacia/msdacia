<template>
	<div class="ui statistics">
		<div class="ui inverted statistic" v-for="t of sortedTags" :key="t" @click="selectTag(t)" :class="{ selected: t == tag }">
			<div class="value">{{ tagMap.get(t) }}</div>
			<div class="label">{{ t }}</div>
		</div>
	</div>
</template>

<script>

	export default {
		props: {
			onTagSelected: Function
		},
		data: function () {
			return {
				content: require('../json/static.en-us.json'),
				tag: undefined
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
		},
		methods: {
			selectTag(tag) {
				this.tag = tag
				this.onTagSelected(tag)
			}
		}
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

</style>