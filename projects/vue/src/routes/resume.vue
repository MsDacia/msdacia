<template>
	<div class="ui grid">
		<div class="two wide column">
			<div class="block">
				<h1>{{content.resume.title}}</h1>
			</div>
		</div>
		<div class="fourteen wide column">
			<address>{{content.resume.address}}</address>
			<p><a :href="content.resume.resumeUrl" target="_blank" class="has-icon">
				<i class="inverted file pdf outline icon"></i>
				{{content.resume.resumeTitle}}
			</a></p>
			<h2 class="ui top attached header">{{content.resume.skills.title}}</h2>
			<div class="ui attached segment">
				<table class="ui definition table">
					<tbody>
						<tr v-for="skill in content.resume.skills.categories" :key="skill.id">
							<td class="two wide column">{{skill.title}}</td>
							<td>{{skill.copy}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h2 class="ui attached header">{{content.resume.links.title}}</h2>
			<div class="ui attached segment">
				<div class="ui card">
					<div class="ui horizontal list">
						<div class="item" v-for="link in content.resume.links.categories" :key="link.id">
							<div class="content">
								<a :href="link.url" self="_blank">{{link.title}}</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<h2 class="ui attached header">{{content.resume.objective.title}}</h2>
			<div class="ui attached segment">
				<div class="ui card">
					<div class="content">
						<div class="description">
							<p>{{content.resume.objective.copy}}</p>
						</div>
					</div>
				</div>
			</div>
			<h2 class="ui attached header">{{content.resume.experiences.title}}</h2>
			<div class="ui attached segment">
				<div class="ui accordion">
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
										<div class="date">{{job.date}}</div>
										<div class="summary"><strong>{{job.company}}</strong>, {{job.location}}</div>
										<div class="extra text">
											<div class="ui middle aligned divided list" v-for="point in job.points" :key="point.id">
												<div class="item">
													<i class="small circle icon"></i>
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
			</div>
			<h2 class="ui attached header">{{content.resume.education.title}}</h2>
			<div class="ui attached segment">
				<div class="ui card">
					<div class="content">
						<div class="header">{{content.resume.education.school}}</div>
						<div class="meta">
							<div class="time">{{content.resume.education.date}}</div>
							<div class="category">{{content.resume.education.degree}}</div>
						</div>
						<div class="description">
							<p><em>Major:</em> {{content.resume.education.major}}</p>
							<p><em>Minor:</em> {{content.resume.education.minor}}</p>
							<p><em>Specialization:</em> {{content.resume.education.specialization}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data: function () {
			return {
				content: require('../json/static.en-us.json')
			}
		},
		mounted() {
			$('.ui.accordion').accordion()
		}
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

	h1
		left: -86px
		top: 145px

	address ~ p
		a
			color: $text

			&:hover,
			&.active
				color: $anchor-text-hover

	.ui.card
		width: auto

</style>
