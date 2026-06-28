import { useState } from 'react'

import content from '../media/json/static.en-us.json'

export default function Experience() {
	const [
		expandedIndex,
		setExpandedIndex,
	] = useState<number | null>(null)

	return (
		<div className="ui accordion">
			{content.resume.experiences.job.map((job, index) =>
				<div key={index}>
					<div
						className={`title ${expandedIndex === index ? 'active' : ''}`}
						onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
					>
						<div className="ui icon message">
							<i className="laptop icon" />

							<div className="content">
								<div className="header">{job.title}</div>
							</div>
						</div>
					</div>

					<div className={`content ${expandedIndex === index ? 'active' : ''}`}>
						<div className="ui feed">
							<div className="event">
								<div className="content">
									<div className="summary">
										<strong>{job.company}</strong>,
										{job.location},
										<span className="date">{job.date}</span>
									</div>

									<div className="extra text">
										{job.groups
											? job.groups.map((group, groupIndex) =>
												<div
													key={groupIndex} className="responsibility-group"
												>
													<h4 className="ui sub header">{group.title}</h4>
													<Points points={group.points} />
												</div>
											)
											: <Points points={job.points ?? []} />
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

function Points({ points }: { points: readonly string[] }) {
	return (
		<>
			{points.map((point, index) =>
				<div
					key={index} className="ui middle aligned divided list"
				>
					<div className="item">
						<i className="tiny circle icon" />
						<div
							className="content" dangerouslySetInnerHTML={{ __html: point }}
						/>
					</div>
				</div>
			)}
		</>
	)
}
