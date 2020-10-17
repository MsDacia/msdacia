import React from 'react'
// import content from '../json/static.en-us.json'

// function getImage(image): string {
// 	return require('../assets/images/projects/' + image)
// }

// function showModal(project): void {
// 	return //$('#' + project + '.modal').modal('attach events', '#' + project + '-link', 'show')
// }

export default function Timeline() {
	return (
		<div className="timeline">
			<div className="ui grid">
				<div className="five wide column">
					{/* {content.portfolio.projects.map((project, index) =>
						<div className="item" key={index}>
							<div className="ui segment">
								<div className="ui massive label" v-if="index === 0 || projects[index - 1].year !== project.year">{project.year}</div>
								<span
									id={`project-${project.unique}-link`}
									className="ui small image project hvr-grow-shadow"
									onClick={showModal(project)}
								>
									<img src={getImage(project.image)} alt={project.name} />
									<div className="ui green right ribbon label">{project.timeline}</div>
									<div className="ui bottom attached label">{project.name}</div>
								</span>

								<div className="ui basic modal" id={`project-${project.unique}`}>
									<div className="actions">
										<i className="close icon cancel"></i>
									</div>
									<div className="ui header">
										<div className="ui massive label">{project.year}</div>
									</div>
									<div className="content">
										<h3>
											<a v-if="project.link" href={project.link} target="_blank" rel="noopener noreferrer">{project.name}</a>
											<span v-if="!project.link">{project.name}</span>
										</h3>
										<span className="ui small image">
											<img src={getImage(project.image)} alt={project.name} />
											<div className="ui green right ribbon label">{project.timeline}</div>
										</span>
										<div className="ui labels">
											{project.tags.map((tag, index) =>
												<span className="ui label" key={index}>{tag}</span>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					)} */}
				</div>
			</div>
		</div>
	)
}
