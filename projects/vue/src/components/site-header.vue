<template>
	<header>
		<div class="row">
			<div class="col-xs-4"></div>
			<div class="col-xs-7">
				<b-navbar type="dark" variant="default">
					<b-nav is-nav-bar class="pull-xs-left">
						<li v-for="headerNav in content.common.navigation" :key="headerNav.id" class="nav-item">
							<router-link class="nav-link" :to="headerNav.url">
								{{headerNav.title}}
							</router-link>
						</li>
					</b-nav>
				</b-navbar>
			</div>
			<div class="col-xs-1"></div>
		</div>
	</header>
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

<style lang="sass" scoped>

	@import '../styles/main.sass'

	header
		@include animation(.3s fadeIn forwards)
		position: relative
		width: 100%
		z-index: 3

		.navbar
			@include rem(padding, 5px 10px 5px 20px)

		.navbar-nav
			margin: 0
			padding-left: 0
			padding-right: 0

			.nav-item
				@include rem(padding, 10px 20px 20px 0)
				width: 23%

				.nav-link
					@include transform(1px, 0)
					@include transition(all .3s)
					box-shadow: 0 0 1px transparent
					color: $text
					display: block
					font-family: $font-stack-sans-serif2
					font-size: 22px
					overflow: hidden
					pointer-events: all
					position: relative
					text-decoration: none
					vertical-align: top

					&.active
						color: $text7

					&:hover
						color: $anchor-text-hover

</style>
