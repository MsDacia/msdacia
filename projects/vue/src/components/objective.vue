<template>
	<div class="ui card" v-if="!loading">
		<div class="content">
			<div class="description">
				<p>{{content.resume.objective.copy}}</p>
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

}

</script>

<style scoped lang="sass">

	.ui.card
		.content
			padding-top: 0

</style>
