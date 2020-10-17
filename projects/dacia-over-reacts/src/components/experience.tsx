import React from 'react'
import content from '../json/static.en-us.json'

export default function Experience() {
	return (
		<div className="ui accordion">
			{content.resume.experiences.job.map((job, index) =>
				<span key={index}>
					<div className="title">
						<div className="ui icon message">
							<i className="laptop icon"></i>
							<div className="content">
								<div className="header">{job.title}</div>
							</div>
						</div>
					</div>
					<div className="content">
						<div className="ui feed">
							<div className="event">
								<div className="content">
									<div className="summary">
										<strong>{job.company}</strong>,
										{job.location},
										<span className="date">{job.date}</span>
									</div>

									<div className="extra text">
										{job.points.map((point, index) =>
											<div className="ui middle aligned divided list" key={index}>
												<div className="item">
													<i className="tiny circle icon"></i>
													<div className="content" dangerouslySetInnerHTML={{ __html: point }}></div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</span>
			)}
		</div>
	)
}
