<template>
	<div class="ui accordion">
		<div class="active title">
			<div class="ui icon message">
				<i class="heartbeat icon"></i>
				<div class="content">
					<div class="header">{{content.about.subtitle}}</div>
				</div>
			</div>
		</div>
		<div class="active content">
			<p v-html="content.about.copy"></p>
		</div>
		<div class="title">
			<div class="ui icon message">
				<i class="desktop icon"></i>
				<div class="content">
					<div class="header">{{content.about.subtitle2}}</div>
				</div>
			</div>
		</div>
		<div class="content">
			<p v-html="content.about.copy2"></p>
		</div>
		<div class="title">
			<div class="ui icon message">
				<i class="diamond icon"></i>
				<div class="content">
					<div class="header">{{content.about.subtitle3}}</div>
				</div>
			</div>
		</div>
		<div class="content">
			<p v-html="content.about.copy3"></p>
			<p v-html="content.about.copy4"></p>
		</div>
	</div>
</template>

<script>

	export default {
		data: function () {
			return {
				content: require('../json/static.en-us.json')
			}
		},
		mounted() {
			$('.ui.accordion').accordion()
		}
	}

</script>
