<template>
	<div class="ui grid" v-if="!loading">
		<div class="two wide column">
			<div class="block">
				<h1>{{content.about.title}}</h1>
			</div>
		</div>
		<div class="fourteen wide column">
			<wysiwyg></wysiwyg>
		</div>
	</div>
</template>

<script>

import firebase from 'firebase/app'
import { db, contentRef } from '@/datastore'

import Wysiwyg from '../components/wysiwyg.vue'

export default {

	components: {
		Wysiwyg,
	},

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
