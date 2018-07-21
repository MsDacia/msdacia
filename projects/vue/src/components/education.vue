<template>
	<div class="ui card">
		<div class="content">
			<div class="header">{{content.resume.education.school}}</div>
			<div class="meta">
				<div class="category">
					{{content.resume.education.degree}},
					<span class="time">{{content.resume.education.date}}</span>
				</div>
			</div>
			<div class="description">
				<p>{{content.resume.education.major}}<br /><em>Major</em></p>
				<p>{{content.resume.education.minor}}<br /><em>Minor</em></p>
				<p>{{content.resume.education.specialization}}<br /><em>Specialization</em></p>
			</div>
		</div>
	</div>
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
