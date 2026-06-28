import { UIModal } from '@davidanddacia/react-ui-components'
import { useState } from 'react'

import content from '../media/json/static.en-us.json'

function getImage(image: string): string {
	return new URL(`../media/assets/images/projects/${image}`, import.meta.url).href
}

export default function Timeline() {
	const [
		activeProject,
		setActiveProject,
	] = useState<string | null>(null)

	return (
		<div className="timeline">
			<div className="ui grid">
				<div className="five wide column">
					{content.portfolio.projects.map((project, index) =>
						<div
							key={index} className="item"
						>
							<div className="ui segment">
								{index === 0 || content.portfolio.projects[index - 1].year !== project.year &&
									<div className="ui massive label">{project.year}</div>
								}

								<a
									className="ui small image project hvr-grow-shadow"
									id={`project-${project.unique}-link`}
									onClick={() => setActiveProject(project.unique)}
								>
									<img
										alt={project.name} src={getImage(project.image)}
									/>
									<div className="ui green right ribbon label">{project.timeline}</div>
									<div className="ui bottom attached label">{project.name}</div>
								</a>

								<UIModal
									enableFooter={false}
									isOpen={activeProject === project.unique}
									titleSlot={
										<div className="ui header">
											<div className="ui massive label">{project.year}</div>

											<h3>
												{project.link ?
													<a
														href={project.link} target="_blank"
													>
														{project.name}
													</a>
													:
													<span>{project.name}</span>
												}
											</h3>
										</div>
									}
									onCancel={() => setActiveProject(null)}
								>
									<span className="ui small image">
										<img
											alt={project.name} src={getImage(project.image)}
										/>
										<div className="ui green right ribbon label">{project.timeline}</div>
									</span>

									<div className="ui labels">
										{project.tags.map((tag, index) =>
											<span
												key={index} className="ui label"
											>{tag}</span>
										)}
									</div>
								</UIModal>
							</div>
						</div>
					)}
				</div>
			</div>
		</div >
	)
}

export interface Project {
	client: string
	id: number
	image: string
	link?: string
	name: string
	tags: string[]
	timeline: string
	unique: string
	year: string
}
