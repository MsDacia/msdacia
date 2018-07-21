<template>
	<div class="wrapper">
		<cover-background>
			<transition name="zoom">
				<router-view class="main-content"></router-view>
			</transition>
		</cover-background>
	</div>
</template>

<script>

import CoverBackground from '../components/cover-background.vue'

export default {
	components: {
		CoverBackground,
	},
}

</script>
