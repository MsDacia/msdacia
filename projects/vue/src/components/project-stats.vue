<template>
	<div class="statistics">
		<div class="ui labels">
			<a class="ui label hvr-grow-shadow" v-for="t of sortedTags" :key="t" @click="selectTag(t), hideLabels()" :class="{ selected: t == tag }">
				<span>{{ tagMap.get(t) }}</span> {{t}}
				<i v-if="t == tag" class="remove icon" @click.stop="selectTag(undefined), showLabels()"></i>
			</a>
		</div>
	</div>
</template>

<script>

	export default {
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

					if (countA === countB) {
						return a.localeCompare(b)
					} else {
						return countB - countA
					}
				})
			}
		},
		methods: {
			selectTag(tag) {
				this.tag = tag
				this.$emit('tag-selected', tag)
			},
			hideLabels: function () {
				const labels = document.getElementsByClassName('labels')[0]
				labels.className += ' activated'
			},
			showLabels: function () {
				const labels = document.getElementsByClassName('labels')[0]
				labels.className = 'ui labels'
			}
		}
	}

</script>