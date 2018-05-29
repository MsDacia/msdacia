<template>
	<div class="ui icon ad message">
		<i class="laptop icon"></i>
		<div class="content">
			<div class="header">{{ content.common.ad.work.title }}</div>
			<p>{{ content.common.ad.work.copy }}</p>
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