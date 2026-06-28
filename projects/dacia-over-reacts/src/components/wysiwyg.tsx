import { useState } from 'react'

import content from '../media/json/static.en-us.json'

export default function Wysiwyg() {
	const [
		expandedIndex,
		setExpandedIndex,
	] = useState<number | null>(null)

	const sections = [
		{
			icon: 'heartbeat',
			header: content.about.subtitle,
			text: content.about.copy,
		},
		{
			icon: 'desktop',
			header: content.about.subtitle2,
			text: content.about.copy2,
		},
		{
			icon: 'diamond',
			header: content.about.subtitle3,
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
