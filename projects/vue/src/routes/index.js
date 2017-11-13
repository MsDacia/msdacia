import About from './about'
import Blog from './blog'
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
				component: Blog,
				path: '/blog'
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
