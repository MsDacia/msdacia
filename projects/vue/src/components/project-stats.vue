<template>
	<div class="statistics">
		<div class="ui labels">
			<a class="ui label" v-for="t of sortedTags" :key="t" @click="selectTag(t)" :class="{ selected: t == tag }">
				<span>{{ tagMap.get(t) }}</span> {{t}}
			</a>
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
				return Array.from(this.tagMap.keys()).sort((a, b) => {
					const countA = this.tagMap.get(a)
					const countB = this.tagMap.get(b)

					return countB - countA
				})
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