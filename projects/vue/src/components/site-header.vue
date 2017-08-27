<template>
	<header>
		<div class="container">
			<div class="mobile-only ui right floated main menu">
				<div class="ui big launch right attached fixed button dropdown">
					<div class="item" @click="showMenu = !showMenu">
						<i class="content icon"></i>
						<em>Menu</em>
					</div>

					<div class="menu" :class="[ showMenu ? 'show-content' : 'hide-content' ]">
						<p v-for="headerNav in content.common.navigation" :key="headerNav.id">
							<router-link class="nav-link" :to="headerNav.url" @click="showMenu = false">
								{{headerNav.title}}
							</router-link>
						</p>
					</div>
				</div>
			</div>

			<div class="desktop-only ui right floated main menu">
				<span v-for="headerNav in content.common.navigation" :key="headerNav.id">
					<router-link class="nav-link" :to="headerNav.url">
						{{headerNav.title}}
					</router-link>
				</span>
			</div>
		</div>
	</header>
</template>

<script>

	export default {
		data: function () {
			return {
				content: require('../json/static.en-us.json'),
				showMenu: false
			}
		}
	}

</script>

<style lang="sass" scoped>

	@import '../styles/main.sass'

	.video-container
		header
			background: linear-gradient($background3, transparent)
			min-height: 60px
			padding-bottom: 0
			padding-right: 0
			z-index: 5

			@include phablet-large
				@include rem(padding-right, 15px)
				min-height: 80px

			.ui.right
				&.floated.menu
					margin: 0

				&.attached.button
					box-shadow: inherit !important
					padding: 0

			.container
				margin: 0 auto
				max-width: 1200px

				span
					@include rem(letter-spacing, .5px)

				.launch
					background: transparent
					font-size: 15px
					pointer-events: all

					em
						@include rel-pos(-1px, auto, auto, auto)
						font-family: $font-stack-serif

					.item
						@include transform(1px, 0)
						@include transition(all 1s)
						color: $text
						overflow: hidden
						padding: 0
						pointer-events: all
						z-index: 16

						&:hover
							color: $anchor-text-hover

					.menu
						@include abs-pos(0, auto, auto, 0)
						@include rem(padding, 60px 30px)
						background: linear-gradient($background4, $background3)
						pointer-events: all
						position: fixed
						text-align: center
						z-index: 15

						a
							@include rem(margin, 0 15px 10px)
							@include rem(padding-bottom, 5px)
							cursor: pointer
							display: inline-block
							font: normal 2rem/1.6 $font-stack-serif

							&:before
								@include transition(all 1s ease-out)

				.desktop-only
					&.menu
						a
							@include rem(padding, 0 20px 5px)
							color: $text
							cursor: pointer
							display: inline-block
							font: 2rem/1.6 $font-stack-serif

							&:before
								@include transition(all 1s ease-out)

</style>
