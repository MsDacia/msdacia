import About from './about'
import Home from './home'
import Portfolio from './portfolio'
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
			}
		]
	}
]
