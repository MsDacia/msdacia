<template>
	<table class="ui definition table" v-if="!loading">
		<tbody>
			<tr v-for="skill in content.resume.skills.categories" :key="skill.id">
				<td class="two wide column">{{skill.title}}</td>
				<td>{{skill.copy}}</td>
			</tr>
		</tbody>
	</table>
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
