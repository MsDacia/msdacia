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

			<ul>
				<li v-for="link in content.projects.list" :key="link.id">
					<p><a :href="link.url" target="_blank"><i :class="link.icon"></i>{{link.title}}</a></p>
				</li>
			</ul>
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
