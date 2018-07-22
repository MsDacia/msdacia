<template>
	<div class="ui icon ad message" v-if="!loading">
		<i class="laptop icon"></i>
		<div class="content">
			<div class="header">{{ content.common.ad.work.title }}</div>
			<p>{{ content.common.ad.work.copy }}</p>
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
