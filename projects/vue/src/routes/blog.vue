<template>
	<div class="ui grid">
		<div class="two wide column">
			<div class="block">
				<h1>{{content.blog.title}}</h1>
			</div>
		</div>
		<div class="fourteen wide column">
			<blog-nav></blog-nav>
			<blog-feed></blog-feed>
			<blog-post></blog-post>
		</div>
	</div>
</template>

<script>

	import BlogFeed from '../components/blog-feed.vue'
	import BlogNav from '../components/blog-nav.vue'
	import BlogPost from '../components/blog-post.vue'

	export default {
		components: {
			BlogFeed,
			BlogNav,
			BlogPost
		},
		data: function () {
			return {
				content: require('../json/static.en-us.json')
			}
		}
	}

</script>
