<template>
	<div class="ui grid">
		<div class="two wide column">
			<div class="block">
				<h1>{{content.projects.title}}</h1>
			</div>
		</div>
		<div class="fourteen wide column">	
			<p v-html="content.projects.copy"></p>

			<h2>{{content.projects.subtitle}}</h2>

			<div class="ui list">
				<div class="item" v-for="link in content.projects.list" :key="link.id">
					<div class="content">
						<a :href="link.url" target="_blank"><i :class="link.icon"></i>{{link.title}}</a>
					</div>
				</div>
			</div>

			<div class="ui container">
				<div class="timeline">
					<div class="item" :data-text="project.title" v-for="project in content.projects.project" :key="project.id">
						<div class="content">
							<img class="image" :src="'assets/images/projects/' + project.image" />
							<h2 class="title" v-html="project.year"></h2>
							<div class="ui tag labels">
								<a class="ui label" v-for="tag in project.tags" :key="tag.id">
									{{tag}}
								</a>
							</div>
							<h3>{{project.client}}</h3>
							<h4>{{project.timeline}}</h4>
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
		}
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

	h1
		left: -98px
		top: 145px

</style>
