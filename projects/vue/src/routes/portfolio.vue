<template>
	<div class="ui grid">
		<div class="two wide column">
			<h1>{{content.projects.title}}</h1>
		</div>
		<div class="fourteen wide column">	
			W.I.P.

			<!-- <h1>{{content.projects.title}}</h1>

			<div class="content">
				<p v-html="content.projects.copy"></p>
				<h2>{{content.projects.subtitle}}</h2>
				<ul>
					<li v-for="link in content.projects.list" :key="link.id">
						<p><a :href="link.url" target="_blank"><i :class="link.icon"></i>{{link.title}}</a></p>
					</li>
				</ul>
			</div> -->
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

<style lang="sass">

	@import '../styles/main.sass'

</style>
