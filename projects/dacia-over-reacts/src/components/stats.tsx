import React from 'react'
//import content from '../json/static.en-us.json'

// let currentTag = undefined

// function selectTag(tag) {
// 	currentTag = tag
// 	$emit('tag-selected', tag)
// }

// function hideLabels(): void {
// 	document.getElementsByClassName('labels')[0].className += ' activated'
// }

// function showLabels(): void {
// 	document.getElementsByClassName('labels')[0].className = 'ui labels'
// }

// function scrollToTop(): void {
// 	document.getElementById('timeline').scrollIntoView()
// }

// function tagMap() {
// 	const map = new Map()
// 	for (const project of content.portfolio.projects) {
// 		for (const tag of project.tags) {
// 			if (!map.has(tag)) {
// 				map.set(tag, 1)
// 			} else {
// 				const count = map.get(tag)
// 				map.set(tag, count + 1)
// 			}
// 		}
// 	}
// 	return map
// }

// function sortedTags() {
// 	return Array.from(tagMap.keys()).sort((a, b) => {
// 		const countA = tagMap.get(a)
// 		const countB = tagMap.get(b)

// 		if (countA === countB) {
// 			return a.localeCompare(b)
// 		} else {
// 			return countB - countA
// 		}
// 	})
// }

export default function Stats() {
	return (
		<div className="statistics">
			<div className="ui labels">
				{/* {sortedTags.map((t, index) =>
					<a
						className={`ui label hvr-grow-shadow ${selected: t === currentTag }`}
						onClick={selectTag(t), hideLabels(), scrollToTop()}
						key={index}
					>
						<span>{tagMap.get(t)}</span>
						<br />{t}
						if (t === tag) {
							<i className="remove icon" onClick={selectTag(undefined), showLabels()}></i>
						}
					</a>
				)} */}
			</div>
		</div>
	)
}
