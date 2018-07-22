<template>
	<div class="ui card" v-if="!loading">
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

import firebase from 'firebase/app'
import { db, contentRef } from '@/datastore'

export default {

	data() {
		return {
			loading: true
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
		runAnalytics(title) {
			this.$ga.event('Resume Links', 'click', title)
		},
	},

}

</script>
