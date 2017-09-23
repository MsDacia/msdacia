<template>
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