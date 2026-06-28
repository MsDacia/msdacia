import content from '../media/json/static.en-us.json'

export default function Projects() {
	return (
		<div className="ui card">
			<div className="ui horizontal list">
				{content.resume.projects.categories.map((project, index) =>
					<div
						key={index} className="item"
					>
						<div className="content">
							<a
								href={project.url} rel="noopener noreferrer"
								target="_blank"
							>{project.title}</a>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
