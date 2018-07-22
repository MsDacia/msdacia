<template>
	<div class="ui accordion" v-if="!loading">
		<div class="active title">
			<div class="ui icon message">
				<i class="heartbeat icon"></i>
				<div class="content">
					<div class="header">{{content.about.subtitle}}</div>
				</div>
			</div>
		</div>
		<div class="active content">
			<p v-html="content.about.copy"></p>
		</div>
		<div class="title">
			<div class="ui icon message">
				<i class="desktop icon"></i>
				<div class="content">
					<div class="header">{{content.about.subtitle2}}</div>
				</div>
			</div>
		</div>
		<div class="content">
			<p v-html="content.about.copy2"></p>
		</div>
		<div class="title">
			<div class="ui icon message">
				<i class="diamond icon"></i>
				<div class="content">
					<div class="header">{{content.about.subtitle3}}</div>
				</div>
			</div>
		</div>
		<div class="content">
			<p v-html="content.about.copy3"></p>
			<p v-html="content.about.copy4"></p>
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

	mounted() {
		$('.ui.accordion').accordion()
	},

}

</script>
