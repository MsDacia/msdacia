<template>
	<div>
		 <h1>{{content.common.global.title}}</h1> 
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