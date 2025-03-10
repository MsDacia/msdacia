import { useState } from 'react'
import content from '../media/json/static.en-us.json'

export default function Stats() {
	const [currentTag, setCurrentTag] = useState<string | undefined>(undefined)

	function hideLabels() {
		document.getElementsByClassName("labels")[0]?.classList.add("activated")
	}

	function selectTag(tag: string | undefined) {
		setCurrentTag(tag)
	}

	function showLabels() {
		document.getElementsByClassName("labels")[0]?.classList.remove("activated")
	}

	function scrollToTop() {
		document.getElementById("timeline")?.scrollIntoView()
	}

	function sortedTags() {
		const map = tagMap();
		return Array.from(map.keys()).sort((a, b) => {
			const countA = map.get(a) || 0;
			const countB = map.get(b) || 0;
			return countB - countA || a.localeCompare(b)
		})
	}

	function tagMap() {
		const map = new Map<string, number>()
		for (const project of content.portfolio.projects) {
			for (const tag of project.tags) {
				map.set(tag, (map.get(tag) || 0) + 1)
			}
		}

		return map
	}

	return (
		<div className="statistics">
			<div className="ui labels">
				{sortedTags().map((t, index) => (
					<a
						className={`ui label hvr-grow-shadow ${t === currentTag ? "selected" : ""}`}
						onClick={() => {
							selectTag(t);
							hideLabels();
							scrollToTop();
						}}
						key={index}
					>
						<span>{tagMap().get(t)}</span><br />{t}

						{t === currentTag && (
							<i
								className="remove icon"
								onClick={(e) => {
									e.stopPropagation();
									selectTag(undefined);
									showLabels();
								}}
							/>
						)}
					</a>
				))}
			</div>
		</div>
	)
}
