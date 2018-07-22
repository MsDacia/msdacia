<template>
	<div class="ui accordion" v-if="!loading">
		<span v-for="job in content.resume.experiences.job" :key="job.id">
			<div class="title">
				<div class="ui icon message">
					<i class="laptop icon"></i>
					<div class="content">
						<div class="header">{{job.title}}</div>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="ui feed">
					<div class="event">
						<div class="content">
							<div class="summary">
								<strong>{{job.company}}</strong>,
								{{job.location}},
								<span class="date">{{job.date}}</span>
							</div>
							<div class="extra text">
								<div class="ui middle aligned divided list" v-for="point in job.points" :key="point.id">
									<div class="item">
										<i class="tiny circle icon"></i>
										<div class="content" v-html="point"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</span>
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

<style scoped lang="sass">

@import '@/styles/tools.mixins.sass'

.ui.message
	padding-bottom: 0
	padding-top: 0

	.header:not(.ui)
		margin-bottom: 0
		font-size: .875em

.ui.card
	.content
		padding-top: 0

.ui.accordion:not(.styled) .title~.content:not(.ui):last-child
	@include rem(margin-left, 50px)
	padding-top: 0
	width: 90%

.ui.accordion .title:not(.ui),
.ui.accordion .accordion .title:not(.ui)
	box-shadow: none
	padding-bottom: 0

</style>
