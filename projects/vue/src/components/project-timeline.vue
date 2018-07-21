<template>
	<div class="timeline">
		<div class="ui grid">
			<div class="five wide column" :data-text="project.title" v-for="(project, index) in projects" :key="project.id">
				<div class="item">
					<div class="ui segment">
						<div class="ui massive label" v-if="index === 0 || projects[index - 1].year !== project.year">{{project.year}}</div>
						<a :id="'project-' + project.unique + '-link'" class="ui small image project hvr-grow-shadow" :data-modal="'project-' + project.unique" @click="runAnalytics(project.unique)">
							<img :src="getImage(project)" :alt="project.name" />
							<div class="ui green right ribbon label">{{project.timeline}}</div>
							<div class="ui bottom attached label">{{project.name}}</div>
						</a>

						<div class="ui basic modal" :id="'project-' + project.unique">
							<div class="actions">
								<i class="close icon cancel"></i>
							</div>
							<div class="ui header">
								<div class="ui massive label">{{project.year}}</div>
							</div>
							<div class="content">
								<h3>
									<a v-if="project.link" :href="project.link" target="_blank">
										{{project.name}}
									</a>
									<span v-if="!project.link">{{project.name}}</span>
								</h3>
								<span class="ui small image">
									<img :src="getImage(project)" :alt="project.name" />
									<div class="ui green right ribbon label">{{project.timeline}}</div>
								</span>
								<div class="ui labels">
									<span class="ui label" v-for="tag in project.tags" :key="tag.id">
										{{tag}}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		projects: Array,
	},
	methods: {
		getImage(project) {
			return require('../assets/images/projects/' + project.image)
		},
		runAnalytics(title) {
			this.$ga.event('Resume Links', 'click', title)
		},
	},
	mounted() {
		const projects = $('[data-modal]')

		projects.each(() => {
			const project = $(this).attr('data-modal')
			$('#' + project + '.modal').modal('attach events', '#' + project + '-link', 'show')
		})
	},
}

</script>
