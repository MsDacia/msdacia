import { createRouter, createWebHistory } from 'vue-router'

import About from '../views/About.vue'
import Home from '../views/Home.vue'
import Portfolio from '../views/Portfolio.vue'
import Resume from '../views/Resume.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	linkActiveClass: 'current',
	routes: [
		{
			component: Home,
			name: 'home',
			path: '/',
		},
		{
			component: About,
			name: 'about',
			path: '/about',
		},
		{
			component: Portfolio,
			name: 'portfolio',
			path: '/portfolio',
		},
		{
			component: Resume,
			name: 'resume',
			path: '/resume',
		},
	],
})

export default router
