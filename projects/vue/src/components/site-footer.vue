<template>
  <footer>
    <div id="social-media">
      <email-link
        :local-part="content.common.email.local"
        :domain="content.common.email.domain"
        :subject="content.common.email.subject"
      ></email-link>
      <a
        v-for="social in content.common.social"
        :key="social.id"
        :href="social.url"
        :title="social.title"
        target="_blank"
        @click="runAnalytics(social.title)"
      >
        <i :class="social.icon"></i>
      </a>
    </div>

    <p id="copyright">
      <i :class="content.common.copyright.icon"></i>
      {{content.common.copyright.content}}
      <a
        :href="content.common.global.url"
        @click="runAnalytics( content.common.global.title)"
      >{{content.common.global.title}}</a>
    </p>
  </footer>
</template>

<script>
import EmailLink from '../components/email-link.vue'

export default {
  components: {
    EmailLink
  },
  data() {
    return {
      content: require('../json/static.en-us.json')
    }
  },
  computed: {
    href() {
      let uri = '/home'

      return uri
    }
  },
  methods: {
    open() {
      window.open(this.href, '_self').scrollTo(0, 0)
    },
    runAnalytics(title) {
      this.$ga.event('Footer', 'click', title)
    }
  }
}
</script>

<style scoped lang="sass">
footer
	font-size: 1rem
	position: relative
	text-align: center
	z-index: 2

	#social-media
		align-content: center
		display: flex
		flex-wrap: wrap
		justify-content: center

		a
			@include rem(margin-bottom, 5px)
			color: $text
			text-align: center
			text-decoration: none

			&:last-of-type
				i,
				.icon,
				.svg-inline--fa
					margin-right: 0

			&:hover
				color: $anchor-text-hover2
				cursor: pointer

				i,
				.icon,
				.svg-inline--fa
					color: $anchor-text-hover2

			i,
			.icon,
			.svg-inline--fa
				font-size: 1.2rem
				margin-right: 0.5rem

				&:hover
					color: $anchor-text-hover2

		p
			font-size: ($base-font-size - 2px)

			@include phablet
				@include rem(margin-top, 10px)

			a
				color: $text5
				text-decoration: underline

				&:hover
					color: $text2

			i,
			.icon,
			.svg-inline--fa
				font-size: 0.7rem
</style>
