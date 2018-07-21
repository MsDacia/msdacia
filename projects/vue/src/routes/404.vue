<template>

<div class="copy">
	<h1>{{content.notFound.title}}</h1>
	<p>{{content.notFound.subtitle}}</p>
</div>

</template>

<script>

export default {
	data() {
		return {
			content: require('../json/static.en-us.json'),
		}
	},
	mounted() {
		this.$ga.page(this.$router)
	},
}

</script>
