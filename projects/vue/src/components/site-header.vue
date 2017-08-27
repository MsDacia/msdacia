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
			z-index: 5

			.ui.right.attached.button
				box-shadow: inherit !important
				padding: 0

			.container
				margin: 0 auto
				max-width: 1200px

				span
					@include rem(letter-spacing, .5px)
					color: $text

				.launch
					background: transparent
					color: $text
					font-size: 15px
					pointer-events: all

					em
						@include rel-pos(-1px, auto, auto, auto)

					.item
						@include rem(padding, 5px 0 0 0)
						@include transform(1px, 0)
						@include transition(all 1s)
						color: $text
						overflow: hidden
						pointer-events: all
						z-index: 16

					.menu
						@include abs-pos(0, auto, auto, 0)
						@include rem(padding, 60px 30px)
						background: linear-gradient($background3, $background-alt)
						pointer-events: all
						position: fixed
						text-align: center
						z-index: 15

						a
							@include rem(margin, 0 15px 10px)
							@include rem(padding-bottom, 5px)
							color: $text
							cursor: pointer
							display: inline-block
							font-size: 2rem
							font-weight: normal

							&:before
								@include transition(all 1s ease-out)

							&:hover,
							&.active
								color: $anchor-text

								&:before
									background: $background4

				.desktop-only
					&.menu
						pointer-events: all

						a
							@include rem(padding, 7.5px 20px 10px)
							color: $text
							cursor: pointer
							display: inline-block
							font-size: 2rem

							&:before
								@include transition(all 1s ease-out)

							&:hover,
							&.active
								color: $anchor-text

								&:before
									background: $background5
</style>
