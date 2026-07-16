import { useState } from 'react'

import content from '../media/json/static.en-us.json'

export default function Wysiwyg() {
	const [
		expandedIndex,
		setExpandedIndex,
	] = useState<number | null>(null)

	const sections = [
		{
			header: content.about.subtitle,
			icon: 'heartbeat',
			text: content.about.copy,
		},
		{
			header: content.about.subtitle2,
			icon: 'desktop',
			text: content.about.copy2,
		},
		{
			header: content.about.subtitle3,
			icon: 'diamond',
			text: content.about.copy3,
		},
	]

	return (
		<div className="ui accordion">
			{sections.map((section, index) =>
				<div key={index}>
					<div
						className={`title ${expandedIndex === index ? 'active' : ''}`}
						onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
					>
						<div className="ui icon message">
							<i className={`${section.icon} icon`} />
							<div className="content">
								<div className="header">{section.header}</div>
							</div>
						</div>
					</div>

					<div className={`content ${expandedIndex === index ? 'active' : ''}`}>
						<p dangerouslySetInnerHTML={{ __html: section.text }} />
					</div>
				</div>
			)}
		</div>
	)
}
