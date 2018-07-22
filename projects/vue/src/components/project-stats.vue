<template>
	<div class="statistics" v-if="!loading">
		<div class="ui labels">
			<a class="ui label hvr-grow-shadow" v-for="t of sortedTags" :key="t" @click="selectTag(t), hideLabels(), scrollToTop()" :class="{ selected: t == tag }">
				<span>{{ tagMap.get(t) }}</span>
				<br />{{t}}
				<i v-if="t == tag" class="remove icon" @click.stop="selectTag(undefined), showLabels()"></i>
			</a>
		</div>
	</div>
</template>

<script>

import firebase from 'firebase/app'
import { db, contentRef } from '@/datastore'

export default {

	computed: {
		sortedTags() {
			return Array.from(this.tagMap.keys()).sort((a, b) => {
				const countA = this.tagMap.get(a)
				const countB = this.tagMap.get(b)

				if (countA === countB) {
					return a.localeCompare(b)
				} else {
					return countB - countA
				}
			})
		},

		tagMap() {
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
	},

	data() {
		return {
			loading: true,
			tag: undefined
		}
	},

	firebase: {
		content: {
			source: contentRef,
			asObject: true,
			readyCallback: function () { this.loading = false }
		},
	},

	methods: {
		hideLabels() {
			const labels = document.getElementsByClassName('labels')[0]
			labels.className += ' activated'
		},

		scrollToTop() {
			const timeline = document.getElementById('timeline')
			timeline.scrollIntoView()
		},

		selectTag(tag) {
			this.tag = tag
			this.$emit('tag-selected', tag)
			this.$ga.event('Tag', 'click', tag)
		},

		showLabels() {
			const labels = document.getElementsByClassName('labels')[0]
			labels.className = 'ui labels'
		},
	},
}

</script>