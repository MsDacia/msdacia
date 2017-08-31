<template>
	<header>
		<div class="mobile-only ui right floated main menu">
			<div class="ui launch right attached fixed dropdown">
				<div class="item" @click="showMenu = !showMenu">
					<i class="toggle off icon" :class="[ showMenu ? 'hide-content' : 'show-content' ]"></i>
					<i class="toggle on icon" :class="[ showMenu ? 'show-content' : 'hide-content' ]"></i>
					<em>{{content.common.global.menu}}</em>
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

	.container
		header
			min-height: 60px
			padding-bottom: 0

			@include phablet
				@include rem(padding-right, 15px)
				min-height: 80px

			.ui.right
				margin: 0 auto
				max-width: 1200px

				&.floated.menu
					margin: 0

				&.attached
					box-shadow: inherit !important
					padding: 0

				a
					cursor: pointer
					display: inline-block
					font: normal 2rem/1.6 $font-stack-serif
					letter-spacing: .5px

					&:before
						@include transition(all 1s ease-out)

				.launch
					background: transparent
					font-size: 15px
					pointer-events: all

					.item
						@include transform(1px, 0)
						@include transition(all 1s)
						color: $text
						overflow: hidden
						padding: 0
						pointer-events: all
						z-index: 1501

						em
							@include rel-pos(-1px, auto, auto, auto)
							font-family: $font-stack-serif

					.menu
						@include abs-pos(0, auto, auto, 0)
						@include rem(padding, 50px 30px 40px)
						@include size(100%, 100%)
						background: $background-alt
						pointer-events: all
						position: fixed
						text-align: center
						z-index: 1500

						a	
							@include rem(margin, 0 15px 10px)
							@include rem(padding-bottom, 5px)

			.desktop-only
				span
					a
						@include rem(padding, 0 20px 5px)

</style>
