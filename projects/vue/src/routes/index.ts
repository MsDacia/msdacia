import About from './about.vue'
import Home from './home.vue'
import Portfolio from './portfolio.vue'
import Resume from './resume.vue'
import PageNotFound from './404.vue'
import Wrapper from './wrapper.vue'

export default [
	{
		path: '/',
		redirect: '/home',
	},
	{
		component: Wrapper,
		path: '/wrapper',
		children: [
			{
				component: Home,
				path: '/home',
			},
			{
				component: About,
				path: '/about',
			},
			{
				component: Portfolio,
				path: '/portfolio',
			},
			{
				component: Resume,
				path: '/resume',
			},
			{
				component: PageNotFound,
				path: '*',
			},
		],
	},
]
