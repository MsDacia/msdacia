<template>
	<table class="ui definition table">
		<tbody>
			<tr v-for="skill in content.resume.skills.categories" :key="skill.id">
				<td class="two wide column">{{skill.title}}</td>
				<td>{{skill.copy}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

export default {
	data() {
		return {
			content: require('../json/static.en-us.json'),
		}
	},
}
</script>
