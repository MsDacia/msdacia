import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import * as VueFire from 'vuefire'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VueRouter from 'vue-router'

import routes from './routes'

import './vendor/font-awesome/css/font-awesome-core.css'
import './vendor/font-awesome/css/font-awesome-brands.css'
import './vendor/font-awesome/css/font-awesome-light.css'
import './vendor/font-awesome/css/font-awesome-regular.css'
import './vendor/font-awesome/css/font-awesome-solid.css'

import '../node_modules/semantic-ui/dist/semantic.min.css'
import '../node_modules/semantic-ui/dist/semantic.min.js'

// load vue plug-ins
Vue.use(BootstrapVue)
Vue.use(VueVirtualScroller)
Vue.use(VueFire)
Vue.use(VueRouter)


// set up router and app
const router = new VueRouter({ routes, linkActiveClass: 'current' })
const app = new Vue({ router }).$mount('#app')
