<template>
	<div class="ui grid">
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

	import Wysiwyg from '../components/wysiwyg.vue'

	export default {
		components: {
			Wysiwyg
		},
		data: function () {
			return {
				content: require('../json/static.en-us.json')
			}
		}
	}

</script>
