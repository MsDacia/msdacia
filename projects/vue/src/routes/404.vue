<template>

<div class="copy" v-if="!loading">
	<h1>{{content.notFound.title}}</h1>
	<p>{{content.notFound.subtitle}}</p>
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

	mounted() {
		this.$ga.page(this.$router)
	},
}

</script>
