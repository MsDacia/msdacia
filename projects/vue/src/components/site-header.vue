<template>
	<header>
		<switch-theme></switch-theme>
		<div class="mobile-only ui right floated main menu">
			<div class="ui launch right attached fixed dropdown">
				<div class="item" @click="showMenu = !showMenu">
					<i class="toggle off icon" :class="[ showMenu ? 'hide-content' : 'show-content' ]"></i>
					<i class="toggle on icon" :class="[ showMenu ? 'show-content' : 'hide-content' ]"></i>
					<em :class="[ showMenu ? 'active' : '' ]">{{content.common.global.menu}}</em>
				</div>

				<div class="menu" :class="[ showMenu ? 'show-content' : 'hide-content' ]">
					<span v-for="headerNav in content.common.navigation" :key="headerNav.id">
						<router-link class="nav-link" :to="headerNav.url" @click.native="showMenu = false">
							{{headerNav.title}}
						</router-link>
					</span>
				</div>
			</div>
		</div>

		<div class="desktop-only ui right floated main menu">
			<router-link class="nav-link" :to="headerNav.url" v-for="headerNav in content.common.navigation" :key="headerNav.id">
				{{headerNav.title}}
			</router-link>
		</div>
	</header>
</template>

<script>

	import SwitchTheme from '../components/switch-theme.vue'

	export default {
		components: {
			SwitchTheme
		},
		data: function () {
			return {
				content: require('../json/static.en-us.json'),
				showMenu: false
			}
		}
	}

</script>

<style scoped lang="sass">

	.container
		header
			min-height: 60px
			padding-bottom: 0
			z-index: 3

			@include phablet
				@include rem(padding-right, 15px)
				min-height: 120px

			.ui.left,
			.ui.right
				margin: 0 auto
				max-width: 1200px

				&.floated.menu
					margin: 0

					&.desktop-only
						@include rem(margin, 30px 0 0)

						a
							@include rem(padding, 0 20px 5px)

				&.attached
					box-shadow: inherit !important
					padding: 0

				a
					color: $text
					cursor: pointer
					display: inline-block
					font: normal 2em/1.6 $font-stack-serif
					letter-spacing: .5px

					&:before
						@include transition(all 1s ease-out)

				.launch
					background: transparent
					font-size: 1.5em
					pointer-events: all

					.item
						@include transform(1px, 0)
						@include transition(all 1s)
						color: $text
						overflow: hidden
						padding: 0
						pointer-events: all
						z-index: 1501

						i
							font-weight: 900

							&.on
								color: $anchor-text-hover

						em
							@include rel-pos(-1px, auto, auto, auto)
							font-family: $font-stack-serif

							&.active
								color: $anchor-text-hover

					.menu
						@include abs-pos(0, auto, auto, 0)
						@include rem(padding, 50px 30px 40px)
						@include size(100%, 100%)
						background: $background-alt
						pointer-events: all
						position: fixed
						text-align: center
						z-index: 1500

						span
							display: block

						a
							@mixin bold()
							@include rem(margin, 0 15px 10px)
							@include rem(padding-bottom, 5px)

							&:hover,
							&.active,
							&.router-link-exact-active
								color: $anchor-text-hover
								cursor: pointer

								&:before
									background: $anchor-text-hover
									height: 3px
									right: 0

</style>
