import React from 'react'
import content from '../json/static.en-us.json'

export default function About() {
	return (
		<div className="ui grid">
			<div className="two wide column">
				<div className="block">
					<h1>{content.about.title}</h1>
				</div>
			</div>
			<div className="fourteen wide column">
				{/* <wysiwyg></wysiwyg> */}
			</div>
		</div>
	)
}
