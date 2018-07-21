import Vue from 'vue'
import VueFire from 'vuefire'
import VueAnalytics from 'vue-analytics'
import VueRouter from 'vue-router'

import '@/vendor/font-awesome/css/all.css'
import '@/vendor/semantic-ui/semantic.min.js'
import '@/vendor/semantic-ui/semantic.min.css'

import '../node_modules/hover.css/css/hover-min.css'

import App from './routes/app.vue'

import routes from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	linkActiveClass: 'active'
})

// load vue plug-ins
Vue.use(VueFire)
Vue.use<VueAnalytics.Options>(VueAnalytics, {
	id: 'UA-110464609-1',
	checkDuplicatedScript: true,
	router,
	autoTracking: {
		untracked: true,
		pageviewOnLoad: true,
		pageviewTemplate(route) {
			return {
				location: window.location.href,
				page: route.path,
				title: document.title,
			}
		},
		shouldRouterUpdate(to, from) {
			return to.path !== from.path
		}
	}
})

// set up router and app
new Vue({
	components: { App },
	el: '#app',
	router,
	template: '<app />'
})
