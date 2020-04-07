import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu(props: MenuProps) {
	return (
		<ul>
			{props.items.map(item =>
				<Link to={item.path}>{item.title}</Link>
			)}
		</ul>
	)
}

export interface MenuProps {
	items: MenuItem[]
}

export interface MenuItem {
	path: string
	title: string
}
