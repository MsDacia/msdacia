import { useState, useEffect } from 'react'
import content from '../media/json/static.en-us.json'

export default function Footer({ items }: MenuProps) {
	const [invertColors, setInvertColors] = useState(false)
	const [showMenu, setShowMenu] = useState(false)

	useEffect(() => {
		const bodyTag = document.body

		if (invertColors) {
			bodyTag.classList.add('light')
		} else {
			bodyTag.classList.remove('light')
		}
	}, [invertColors])

	return (
		<header>
			<i
				className="eyedropper icon"
				onClick={() => setInvertColors((prev) => !prev)}
			/>

			<div className="item" onClick={() => setShowMenu((prev) => !prev)}>
				<i
					className={`toggle ${showMenu ? "off" : "on"} icon ${showMenu ? "hide-content" : "show-content"
						}`}
				/>

				<em className={showMenu ? "active" : ""}>
					{content.common.global.menu}
				</em>
			</div>

			<div className={showMenu ? "menu show-content" : "menu hide-content"}>
				{items.map((nav) => (
					<a href={nav.path} key={nav.item} onClick={() => setShowMenu(false)}>
						<i className="terminal icon" /> {nav.title}
					</a>
				))}
			</div>
		</header>
	)
}

export interface MenuProps {
	items: MenuItem[]
}

export interface MenuItem {
	item: string
	path: string
	title: string
}
