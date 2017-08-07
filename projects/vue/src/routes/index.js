import About from './about'
import Home from './home'
import Portfolio from './portfolio'
import Resume from './resume'
import Wrapper from './wrapper'

export default [
	{
		path: '/',
		redirect: '/home'
	},
	{
		component: Wrapper,
		path: '/wrapper',
		children: [
			{
				component: Home,
				path: '/home'
			},
			{
				component: About,
				path: '/about'
			},
			{
				component: Portfolio,
				path: '/portfolio'
			},
			{
				component: Resume,
				path: '/resume'
			}
		]
	}
]
