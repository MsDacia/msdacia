/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

declare module 'vue/types/vue' {

	interface Vue {

		$ga: VueAnalytics

	}

}
