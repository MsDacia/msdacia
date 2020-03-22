import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import * as VueFire from 'vuefire'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import 'hover.css/css/hover-min.css'
import VueAnalytics from 'vue-analytics'
import VueRouter from 'vue-router'

import routes from './routes'

import './vendor/font-awesome/css/fontawesome.css'
import './vendor/font-awesome/css/brands.css'
import './vendor/font-awesome/css/light.css'
import './vendor/font-awesome/css/regular.css'
import './vendor/font-awesome/css/solid.css'

import '../node_modules/semantic-ui/dist/semantic.min.css'
import '../node_modules/semantic-ui/dist/semantic.min.js'

// load vue plug-ins
Vue.use(BootstrapVue)
Vue.use(VueVirtualScroller)
Vue.use(VueFire)
Vue.use(VueRouter)

// set up router and app
const router = new VueRouter(
	{
		routes,
		linkActiveClass: 'current'
	}
)

Vue.use(VueAnalytics, {
	id: 'UA-110464609-1',
	checkDuplicatedScript: true,
	router,
	autotracking: {
		untracked: true,
		pageviewOnLoad: true,
		pageviewTemplate (route) {
			return {
			  page: route.path,
			  title: document.title,
			  location: window.location.href
			}
		},
		shouldRouterUpdate (to, from) {
			return to.path !== from.path
		}
	}
})

const app = new Vue({ router }).$mount('#app')
