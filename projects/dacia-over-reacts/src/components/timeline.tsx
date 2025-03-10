import content from '../media/json/static.en-us.json'

export default function Timeline() {
	return (
		<div className="timeline">
			<div className="ui grid">
				<div className="five wide column">
					{content.portfolio.projects.map((project, index) => (
						<div key={index} className="item">
							<div className="ui segment">
								{index === 0 || content.portfolio.projects[index - 1].year !== project.year && (
									<div className="ui massive label">{project.year}</div>
								)}

								<a
									id={`project-${project.unique}-link`}
									className="ui small image project hvr-grow-shadow"
									data-modal={`project-${project.unique}`}
								>
									<img src={`../media/assets/images/projects/${project.image}`} alt={project.name} />
									<div className="ui green right ribbon label">{project.timeline}</div>
									<div className="ui bottom attached label">{project.name}</div>
								</a>

								<div className="ui basic modal" id={`project-${project.unique}`}>
									<div className="actions">
										<i className="close icon cancel" />
									</div>

									<div className="ui header">
										<div className="ui massive label">{project.year}</div>
									</div>

									<div className="content">
										<h3>
											{project.link ? (
												<a href={project.link} target="_blank">
													{project.name}
												</a>
											) : (
												<span>{project.name}</span>
											)}
										</h3>

										<span className="ui small image">
											<img src={`../media/assets/images/projects/${project.image}`} alt={project.name} />
											<div className="ui green right ribbon label">{project.timeline}</div>
										</span>

										<div className="ui labels">
											{project.tags.map((tag, index) => (
												<span className="ui label" key={index}>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export interface Project {
	id: number
	client: string
	image: string
	link?: string
	name: string
	tags: string[]
	timeline: string
	unique: string
	year: string
}
