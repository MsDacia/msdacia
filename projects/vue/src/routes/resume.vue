<template>
	<div class="ui grid">
		<div class="two wide column">
			<h1>{{content.resume.title}}</h1>
		</div>
		<div class="fourteen wide column">
			<address>{{content.resume.address}}</address>
			<p><a :href="content.resume.resumeUrl" target="_blank" class="has-icon">
				<i class="inverted file pdf outline icon"></i>
				{{content.resume.resumeTitle}}
			</a></p>
			<h2 class="ui top attached header">{{content.resume.skills.title}}</h2>
			<div class="ui attached segment">
				<p></p>
			</div>
			<h2 class="ui attached header">{{content.resume.links.title}}</h2>
			<div class="ui attached segment">
				<p></p>
			</div>
			<h2 class="ui attached header">{{content.resume.objective.title}}</h2>
			<div class="ui attached segment">
				<p></p>
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
							<p></p>
						</div>
					</span>
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

<style lang="sass">

	@import '../styles/main.sass'

	address ~ p
		a
			color: $text

			&:hover,
			&.active
				color: $anchor-text-hover

</style>
