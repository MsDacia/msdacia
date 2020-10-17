import React from 'react'
import Ad from './ad-work'
import content from '../json/static.en-us.json'

export default function Portfolio() {
	return (
		<div className="ui grid">
			<div className="two wide column">
				<div className="block">
					<h1>{content.portfolio.title}</h1>
				</div>
			</div>
			<div className="fourteen wide column">
				<Ad />
				<p dangerouslySetInnerHTML={{ __html: content.portfolio.copy }}></p>

				<div className="ui grid">
					<div className="two wide column">
						<h2>{content.portfolio.subtitle2}</h2>
						{/* <project-stats @tag-selected="onTagSelected"></project-stats> */}
					</div>
					<div id="timeline" className="fourteen wide column">
						<h2>{content.portfolio.subtitle3}</h2>
						{/* <project-timeline :projects="filteredProjects"></project-timeline> */}
					</div>
				</div>
			</div>
		</div>
	)
}
